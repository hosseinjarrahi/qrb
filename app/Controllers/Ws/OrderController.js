'use strict'
const Order = use('App/Models/Order')
const ProductsOrder = use('App/Models/ProductsOrder')

class OrderController {
  constructor ({ socket, request ,auth}) {
    this.socket = socket
    this.request = request
    this.auth = auth
  }

  async onMessage(basketList){
    basketList = Array.isArray(basketList) ? basketList : []
    let spliced = this.socket.topic.split(':')
    let coffeId = spliced[1]
    let deskId = spliced[2]
    let user = ''
    let total = basketList.reduce((acc, item) => acc + item.food.price * item.count, 0)
    user = user ? user.id : null

    let order = await Order.create({
      coffe_id:coffeId,
      desk_id:deskId,
      user_id:user,
      total,
    })

    basketList.forEach(item => {
      ProductsOrder.create({
        product_id: item.food.id,
        product_name: item.food.name,
        product_price: item.food.price,
        order_id: order.id,
        count: item.count,
      })
    })

    this.socket.broadcast(`coffe:${coffeId}`,basketList)
  }

}

module.exports = OrderController
