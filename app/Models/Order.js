'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {

  user(){
    return this.belongsTo('App/Models/User')
  }

  desk(){
    return this.belongsTo('App/Models/Desk')
  }

  coffe(){
    return this.belongsTo('App/Models/Coffe')
  }

  comments(){
    return this.hasMany('App/Models/Comment')
  }

  product_order(){
    return this.hasMany('App/Models/ProductsOrder')
  }

}

module.exports = Order
