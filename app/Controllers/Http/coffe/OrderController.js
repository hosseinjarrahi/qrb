'use strict'

const Order = use('App/Models/Order')
const moment = use('moment')

class OrderController {

  async index({request, response, auth}) {
    let user = await auth.getUser()
    let coffe = await user.coffe().with('desks').first()
    let order = await Order.query()
      .where('coffe_id', coffe.id)
      .where('created_at','>',moment().format('YYYY-MM-DD 00:00:00'))
      .with('product_order')
      .fetch();

    return {order,coffe};
  }

  async show_active({params, request, response, view}) {
    let order = await Order.query()
      .where('success_taken', 'open')
      .andWhere('coffe_id', 1)
      .with('product_order').
      fetch();

    return {order};
  }

  async close({params}) {
    await Order.query()
      .where({id: params.id})
      .update({success_taken: 'closed'});
  }

}

module.exports = OrderController
