'use strict'

const Coffe = use('App/Models/Coffe')
const Comment = use('App/Models/Comment')
const moment = use('moment')
const Order = use('App/Models/Order')


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
    let {rate, coffe_id, body, order_id,options} = request.post()
    let user = {id: null}
    try {
      user = await auth.getUser()
    } catch (e){}
    Comment.create({
      rate,
      coffe_id,
      order_id,
      body,
      options,
      user_id:user.id
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

}

module.exports = HomeController
