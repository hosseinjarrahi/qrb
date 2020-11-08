'use strict'

const Order = use('App/Models/Order')
class OrderController {

    async index({request, response, auth}) {
      let order = await Order.query()
      .where('coffe_id', 1).with('product_order').fetch();
      return {order};
      }

    async show_active({params, request, response, view}) {
        let order = await Order.query()
        .where('success_taken', 'open')
        .andWhere('coffe_id', 1).with('product_order').fetch();
        return {order};
      }
    async close({params}){
      await Order.query().where({id: params.id}).update({success_taken: 'closed'});

    }



}

module.exports = OrderController
