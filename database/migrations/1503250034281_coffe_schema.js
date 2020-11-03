'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CoffeSchema extends Schema {
  up() {
    this.create('coffes', (table) => {
      table.increments();
      table.string('name').notNullable();
      table.string('logo');
      table.string('link').unique().notNullable();
      table.integer('user_id').unsigned().notNullable()
      table.enu('plan', ['A', 'B', 'C', 'D']).notNullable();
      table.timestamps();
    })
  }

  down() {
    this.drop('coffes')
  }
}

module.exports = CoffeSchema
