'use strict'

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class Seeder {
  async run () {
    await Database.raw("SET FOREIGN_KEY_CHECKS=0;");
    await Database.truncate('users');
    await Database.truncate('coffes');
    await Database.truncate('menus');
    await Database.truncate('products');

    await Factory
      .model('App/Models/User')
      .createMany(1)

    await Factory
      .model('App/Models/Coffe')
      .createMany(1)

    await Factory
      .model('App/Models/Menu')
      .createMany(5)

    await Factory
      .model('App/Models/Product')
      .createMany(10)

  }
}

module.exports = Seeder
