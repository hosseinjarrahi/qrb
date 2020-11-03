'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProductsOrder extends Model {
  static get table () {
    return 'products_orders'
  }
}

module.exports = ProductsOrder
