'use strict'

const Product = use('App/Models/Product')

class ProductController {

  async index({request, response, auth}) {
    let coffe = await auth.user.coffe().with('menus.products').fetch();

    return {coffe}
  }

  async store({request, response, auth}) {
    let coffe = auth.user.coffe().with('menus').fetch();

    let found = coffe.menus.filter((menu) => menu.id == request.post().menu_id)

    if(!!found[0]) return {message : 'دسترسی به این بخش میسر نیست'}

    let product = await Product.create(request.only([
      'menu_id',
      'desc',
      'price',
      'name',
    ]));

    return {message: 'با موفقیت ثبت شد', product};
  }

  async show({params, request, response, view}) {
    let product = await Product.findOrFail(params.id);

    return {product};
  }

  async update({params, request, response}) {
    let coffe = auth.user.coffe().with('menus.products').fetch();

    let product = await Product.query().update(request.only([
      'point_per_money',
      'point_cost',
      'point_comment',
      'day_to_delete_point',
    ]));

    return {message: 'با موفقیت ثبت شد', product};
  }

  async destroy({params, request, response}) {
  }
}

module.exports = ProductController
