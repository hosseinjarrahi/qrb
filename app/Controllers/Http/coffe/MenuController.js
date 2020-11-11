'use strict'

const Menu = use('App/Models/Menu')

class MenuController {

  async index({request, response, auth}) {
    let user = await auth.getUser()
    // let user_coffe = await user.coffe().fetch()
    // let coffe_id =  user_coffe.id
    let menu = await Menu.query().where('coffe_id', 1).fetch()
    return {menu};
  }

  async store({request, response, auth}) {
    // let user = await auth.getUser()
    // let user_coffe = await user.coffe().fetch()
    // let coffe_id =  user_coffe.id 
    let coffe_id =1
    let menu = await Menu.create({...request.only(['pic', 'body']),coffe_id});
    return {message: 'با موفقیت ثبت شد', menu};
  }

  async show({params, request, response}) {
    let menu = await Menu.findOrFail(params.id);

    return {menu};
  }

  async update({params, request, response}) {
    await Menu.query().where({id: params.id}).update(request.only(['pic', 'body']));
    return {message: 'باموفقیت ویرایش شد'};
  }

  async destroy({params}) {
    let menu = await Menu.findOrFail(params.id);

    menu.delete();

    return {message: 'باموفقیت حذف شد'};
  }
}

module.exports = MenuController
