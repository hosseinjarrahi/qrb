'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MembershipRequestsSchema extends Schema {
  up () {
    this.create('membership_requests', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('phone', 12).notNullable()
      table.enu('status',['request','refuse', 'accept']).default('request').notNullable()
      table.enu('plan',['order','free', 'club', 'adv']).notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('membership_requests')
  }
}

module.exports = MembershipRequestsSchema
