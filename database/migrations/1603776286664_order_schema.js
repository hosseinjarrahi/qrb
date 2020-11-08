'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.integer('coffe_id').unsigned().notNullable()
      table.integer('user_id').unsigned().notNullable()
      table.integer('desk_id').unsigned().notNullable()
      table.float('total').unsigned().notNullable()
      table.enu('pay_state',['success','failed']).notNullable()
      table.enu('success_taken',['closed','open']).notNullable()
      table.string('trace_code')
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
