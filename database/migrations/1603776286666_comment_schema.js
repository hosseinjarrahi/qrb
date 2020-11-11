'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.increments()
      table.integer('coffe_id').unsigned().notNullable()
      table.integer('order_id').unsigned().notNullable()
      table.text('body').notNullable()
      table.integer('user_id').unsigned()
      table.float('rate').unsigned()
      table.enu('status',['old','new']).default('new')
      table.timestamps()
    })
  }

  down () {
    this.drop('comments')
  }
}

module.exports = CommentSchema
