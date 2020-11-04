'use strict'

const Product = use('App/Models/Product')
const Menu = use('App/Models/Menu')
class ProductController {

  async index({request, response, auth}) {
        // let user = await auth.getUser()
    // let user_coffe = await user.coffe().fetch()
    // let coffe_id =  user_coffe.id
    let menu = await Menu.query().where('coffe_id', 1).pluck('id');
    let menu_name = await Menu.query().where('coffe_id', 1).fetch();
    let product = await Product.query().whereIn('menu_id', menu).fetch();
    return {menu_name, product}


  }

  async store({request, response, auth}) {
    
    // let coffe = auth.user.coffe().with('menus').fetch();

    // let found = coffe.menus.filter((menu) => menu.id == request.post().menu_id)

    // if(!!found[0]) return {message : 'دسترسی به این بخش میسر نیست'}

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
    // let coffe = auth.user.coffe().with('menus.products').fetch();
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
