'use strict'

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')

Factory.blueprint('App/Models/User', (faker) => {
  return {
    name: 'حسین جراحی',
    phone: '09033144565',
    password: 'password',
    role: 'coffe_man',
    last_order: new Date(),
    point_expire: new Date(),
    coffe_id: 1,
    phone_verified: true,
  }
});

Factory.blueprint('App/Models/Coffe', (faker) => {
  return {
    name: 'کافه من',
    link: faker.hash(),
    logo: faker.logo,
    user_id: 1,
  }
});

Factory.blueprint('App/Models/Product', (faker) => {
  return {
    menu_id: 1,
    desc: faker.paragraph({ sentences: 1 }),
    price: 15.5,
    name: 'پیتزا پپرونی',
  }
});

Factory.blueprint('App/Models/Menu', (faker) => {
  return {
    coffe_id: 1,
    pic: 'https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg',
    body: 'پیزا',
  }
});

Factory.blueprint('App/Models/Order', (faker) => {
  return {
    coffe_id: 1,
    user_id: 1,
    desk_id: 1,
    total: 110,
    success_taken: 'open',
    pay_state: 'success'
  }
});

Factory.blueprint('App/Models/ProductsOrder', (faker) => {
  return {
    product_id: 1,
    product_name: "موکا",
    product_price: 12,
    order_id: 1,
    count: 1
  }
});
