'use strict'
const Ws = use('Ws')
const moment = use('moment')
const Order = use('App/Models/Order')
const Desk = use('App/Models/Desk')
const Policy = use('App/Models/Policy')
const ProductsOrder = use('App/Models/ProductsOrder')

class OrderController {

  constructor({socket, request, auth}) {
    this.socket = socket
    this.request = request
    this.auth = auth
    this.sendDeskState(socket.topic, 'open')
  }

  async onBell() {
    let spliced = this.socket.topic.split(':')
    let coffeId = spliced[1]
    let deskId = spliced[2]
    let topic = Ws.getChannel('coffe:*').topic(`coffe:${coffeId}`)
    topic.broadcastToAll('bell', deskId)
  }

  async onMessage(data) {
    let basketList = data.basket
    let desc = data.desc
    basketList = Array.isArray(basketList) ? basketList : []
    let spliced = this.socket.topic.split(':')
    let coffeId = spliced[1]
    let deskId = spliced[2]
    let total = basketList.reduce((acc, item) => acc + item.food.price * item.count, 0)
    let user = {id: null}
    let point = 0
    try {
      user = await this.auth.getUser()
      let policy = await Policy.query().where('coffe_id', coffeId).first()
      if (data.useOff) {
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

    let lastOrder = await Order.query().with('product_order').where({id: order.id}).first()

    this.socket.broadcastToAll(`comment:${deskId}`, lastOrder.id)

    let topic = Ws.getChannel('coffe:*').topic(`coffe:${coffeId}`)
    topic.broadcastToAll('order', lastOrder)
  }

  async onClose(socket) {
    await this.sendDeskState(socket.topic, 'close')
  }

  async sendDeskState(topic, state) {
    let spliced = topic.split(':')
    let coffeId = spliced[1]
    let deskId = spliced[2]
    await Desk.query().where({id: deskId}).update({online: state === 'open'})
    let deskChannel = await Ws.getChannel('coffe:*')
    deskChannel.topic(`coffe:${coffeId}`).broadcastToAll('desk', {deskId, state})
  }

}

module.exports = OrderController
