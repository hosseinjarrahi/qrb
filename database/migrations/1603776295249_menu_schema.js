'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MenuSchema extends Schema {
  up () {
    this.create('menus', (table) => {
      table.increments()
      table.integer('coffe_id').unsigned()
      table.string('pic')
      table.text('body')
      table.timestamps()
    })
  }

  down () {
    this.drop('menus')
  }
}

module.exports = MenuSchema
