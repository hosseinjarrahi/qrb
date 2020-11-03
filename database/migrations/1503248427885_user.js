'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('phone', 12).notNullable().unique()
      table.string('password')
      table.integer('point').unsigned().default(0).notNullable()
      table.enu('role', ['coffe_man', 'costumer', 'admin']).default('costumer').notNullable()
      table.timestamp('last_order').notNullable()
      table.timestamp('point_expire').defaultTo(this.fn.now())
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
