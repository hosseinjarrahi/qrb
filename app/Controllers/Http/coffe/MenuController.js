'use strict'

const Menu = use('App/Models/Menu')

class MenuController {

  async index({request, response, auth}) {
    let user = await auth.getUser()
    let coffe = await user.coffe().first()
    let menu = await Menu.query().where('coffe_id', coffe.id).fetch()

    return {menu};
  }

  async store({request, response, auth}) {
    let user = await auth.getUser()
    let coffe = await user.coffe().first()
    let menu = await Menu.create({...request.only(['pic', 'body']),coffe_id:coffe.id});

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
