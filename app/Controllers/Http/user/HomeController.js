'use strict'

const Ws = use('Ws')
const ZarinpalCheckout = require('zarinpal-checkout');
const Coffe = use('App/Models/Coffe')
const Comment = use('App/Models/Comment')
const moment = use('moment')
const Order = use('App/Models/Order')
const Policy = use('App/Models/Policy')
const ProductsOrder = use('App/Models/ProductsOrder')
const Env = use('Env')

class HomeController {

  async index({request, response, auth, params}) {
    let coffe = await Coffe.query().with('menus.products').with('policy').where('link', params.link).first();
    let user = null
    try {
      user = await auth.getUser()
      if (coffe.policy) {
        if (moment().isAfter(user.point_expire)) {
          user.point = 0;
          user.save()
        }
      }
    } catch (e) {
    }

    return {coffe}
  }

  async comment({request, auth}) {
    let {rate, coffe_id, body, order_id, options} = request.post()
    let user = {id: null}
    try {
      user = await auth.getUser()
    } catch (e) {
    }
    Comment.create({
      rate,
      coffe_id,
      order_id,
      body,
      options,
      user_id: user.id
    })
  }

  async order({request, params}) {
    let orders = await Order.query()
      .where('coffe_id', params.coffeId)
      .where('desk_id', params.deskId)
      .where('success_taken', 'open')
      .with('product_order')
      .fetch();

    return {orders}
  }

  async checkout({request, params,auth}) {

    const zarinpal = await ZarinpalCheckout.create('ff8ac06e-6785-11e9-bbb4-000c29344814', false);

    let basketList = request.post().basket
    let desc = request.post().desc
    basketList = Array.isArray(basketList) ? basketList : []
    let coffeId = request.post().coffeId
    let deskId = request.post().deskId
    let total = basketList.reduce((acc, item) => acc + item.food.price * item.count, 0) // todo : get from database
    let user = {id: null}
    let point = 0
    try {
      user = await auth.getUser()
      let policy = await Policy.query().where('coffe_id', coffeId).first()
      if (request.post().useOff) {
        let foodPoint = total / policy.point_cost
        if (foodPoint - user.point >= 0) {
          point = 0
          total = (foodPoint - user.point) * policy.point_cost
        } else {
          point = Math.sign(-1) * (foodPoint - user.point)
          total = 0
        }
      }
      user.point += point
      user.save()
    } catch (e) {
      console.log(e)
    }

    let order = await Order.create({
      coffe_id: coffeId,
      desk_id: deskId,
      user_id: user.id,
      desc,
      total,
    })

    await basketList.forEach(item => {
      ProductsOrder.create({
        product_id: item.food.id,
        product_name: item.food.name,
        product_price: item.food.price,
        order_id: order.id,
        count: item.count,
      })
    })

    let host = Env.get('NODE_ENV') != 'development' ? 'https://menuman.iran.liara.run' : 'http://localhost:3333'

    let res = await zarinpal.PaymentRequest({
      Amount: total * 1000, // In Tomans
      CallbackURL: '/verify?amount=' + total * 1000 + '&oi=' + order.id,
      Description: 'پرداخت بابت سفارش',
    })

    return res
  }

  async verify({request, response, params}) {

    const zarinpal = await ZarinpalCheckout.create('ff8ac06e-6785-11e9-bbb4-000c29344814', false);

    let res = await zarinpal.PaymentVerification({
      Amount: request.get().amount, // In Tomans
      Authority: request.get().Authority,
    })

    if (res.status != 100) {
      let order = await Order.find(request.get().oi)
      order.delete()
      return response.send(`
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <body bgcolor="#dc143c" style="font-size: 1.5rem">
        <div style="padding: 5px;margin:5px;color:white;text-align: center">پرداخت با شکست مواجه شد</div>
        </body>
    `);
    }

    let order = await Order.query().with('product_order').where({id: request.get().oi}).first()
    order.pay_state = 'success'
    order.trace_code = res.RefID
    order.save()

    let userChannel = Ws.getChannel('order:*').topic(`order:${order.coffe_id}:${order.desk_id}`)
    userChannel.broadcastToAll(`comment:${order.desk_id}`, order.id)
    userChannel.broadcastToAll(`pay:${order.desk_id}`, order.id)

    let topic = Ws.getChannel('coffe:*').topic(`coffe:${order.coffe_id}`)
    topic.broadcastToAll('order', order)
  }

}

module.exports = HomeController
