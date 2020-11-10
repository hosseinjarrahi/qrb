'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DeskSchema extends Schema {
  up () {
    this.create('desks', (table) => {
      table.increments()
      table.integer('coffe_id').unsigned().notNullable()
      table.string('qr')
      table.string('name')
      table.boolean('online').default(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('desks')
  }
}

module.exports = DeskSchema
