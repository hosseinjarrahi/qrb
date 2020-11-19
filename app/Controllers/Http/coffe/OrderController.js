'use strict'

const Order = use('App/Models/Order')
const moment = use('moment')

class OrderController {
  async index({request, response, auth}) {
    let user = await auth.getUser()
    let coffe = await user.coffe().with('desks').first()
    if (!coffe.hasPlan('order')) return response.status(400).json('access denied')
    let order = await Order.query()
      .where('coffe_id', coffe.id)
      .where('created_at', '>', moment().format('YYYY-MM-DD 00:00:00'))
      .with('product_order')
      .fetch();

    return {order, coffe};
  }

  async close({auth, params}) {

    let order = await Order.query()
      .where({id: params.id})
      .first()
    order.success_taken = 'closed';
    order.save();

    let user
    let coffe
    let policy
    try {
      coffe = await order.coffe().fetch()
      policy = await coffe.policy().fetch()
      user = await order.user().fetch()
    } catch (e) {
    }

    if (!user)
      return

    try {
      let point = order.total / policy.point_per_money
      user.point_expire = moment().add('days', coffe.policy.day_to_delete_point ? policy.day_to_delete_point : 0).format('YYYY-MM-DD HH:mm:ss')
      user.point += point
      user.save()
    } catch (e) {
      }

  }

  async destroy({params}) {
    let order = await Order.find(params.id);
    order.delete()
  }

}

module.exports = OrderController
