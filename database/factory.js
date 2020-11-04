'use strict'

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')

Factory.blueprint('App/Models/User', (faker) => {
  return {
    name: 'حسین جراحی',
    phone: '09033144565',
    password: 'password',
    role: 'costumer',
    last_order: new Date(),
    point_expire: new Date(),
    phone_verified: true,
  }
});

Factory.blueprint('App/Models/Coffe', (faker) => {
  return {
    name: 'mr coffe ro',
    link: faker.hash(),
    logo: faker.logo,
    user_id: 1,
    plan: 'A',
  }
});

Factory.blueprint('App/Models/Product', (faker) => {
  return {
    menu_id: 1,
    desc: faker.paragraph({ sentences: 1 }),
    price: 15.5,
    name: 'pizza  jalab',
  }
});

Factory.blueprint('App/Models/Menu', (faker) => {
  return {
    coffe_id: 1,
    pic: 'https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg',
    body: 'پیزا',
  }
});
