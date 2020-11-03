'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CoffeUserSchema extends Schema {
  up () {
    this.create('coffe_user', (table) => {
      table.integer('coffe_id').unsigned()
      table.integer('user_id').unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('coffe_user')
  }
}

module.exports = CoffeUserSchema
