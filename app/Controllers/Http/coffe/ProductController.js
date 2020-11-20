'use strict'

const Product = use('App/Models/Product')
const Menu = use('App/Models/Menu')

class ProductController {

  async index({request, response, auth}) {
    let user = await auth.getUser()
    let coffe = await user.coffe().first()
    let menu = await Menu.query().where('coffe_id', coffe.id).pluck('id');
    let menu_name = await Menu.query().where('coffe_id', coffe.id).fetch();
    let product = await Product.query().whereIn('menu_id', menu).fetch();
    return {menu_name, product}
  }

  async store({request, response, auth}) {
    let user = await auth.getUser()
    // let coffe = await user.coffe().with('menus').first()
    // coffe.menus = Array.isArray(coffe.menus) ? coffe.menus : []
    // let found = coffe.menus.filter((menu) => menu.id == request.post().menu_id)
    //
    // if (!!found[0]) return {message: 'دسترسی به این بخش میسر نیست'}

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

  async update({params, request, auth, response}) {
    // let user = await auth.getUser()
    // let coffe = await user.coffe().with('menus.products').first()
    let product = await Product.query().where('id', params.id).update(request.only([
      'menu_id',
      'desc',
      'price',
      'name',
    ]));

    return {message: 'با موفقیت ثبت شد'};
  }

  async destroy({params, request, response}) {
    let product = await Product.findOrFail(params.id);
    product.delete();
    return {message: 'باموفقیت حذف شد'};
  }
}

module.exports = ProductController
