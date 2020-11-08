'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('phone', 12).notNullable()
      table.boolean('phone_verified').notNullable().default(false)
      table.string('active_code',10)
      table.string('reset_token')
      table.string('password')
      table.integer('point').unsigned().default(0).notNullable()
      table.integer('coffe_id').unsigned()
      table.enu('role', ['coffe_man', 'costumer', 'admin']).default('costumer').notNullable()
      table.timestamp('last_order').notNullable()
      table.timestamp('point_expire').defaultTo(this.fn.now())
      table.timestamps()
      table.unique(['coffe_id', 'phone'])
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
