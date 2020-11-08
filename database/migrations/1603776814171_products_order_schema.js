'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsOrderSchema extends Schema {
  up () {
    this.create('products_orders', (table) => {
      table.increments()
      table.integer('product_id').unsigned().notNullable()
      table.string('product_name').notNullable()
      table.float('product_price').unsigned().notNullable()
      table.integer('order_id').unsigned().notNullable()
      table.integer('count').unsigned().notNullable().default(1)
      table.timestamps()
    })
  }

  down () {
    this.drop('products_orders')
  }
}

module.exports = ProductsOrderSchema
