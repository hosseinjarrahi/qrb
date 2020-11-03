'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PolicySchema extends Schema {
  up () {
    this.create('policies', (table) => {
      table.increments()
      table.integer('coffe_id').unsigned().notNullable()
      table.integer('point_per_money').unsigned().default(0)
      table.integer('point_cost').unsigned().default(0)
      table.integer('point_comment').unsigned().default(0)
      table.integer('day_to_delete_point').unsigned().default(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('policies')
  }
}

module.exports = PolicySchema
