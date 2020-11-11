'use strict'

const Desk = use('App/Models/Desk')
const Coffe = use('App/Models/Coffe')

class DeskController {

  async index({request, response, auth}) {
    let user = await auth.getUser()

    let coffe = await user.coffe().with('desks').fetch();

    return {desks: coffe.desks, coffe}
  }

  async store({request, response, auth}) {
    let user = await auth.getUser()

    let coffe = await user.coffe().first();

    let desk = await Desk.create(request.only([coffe.id, 'qr', 'name']));

    return {message: 'با موفقیت ثبت شد', desk};
  }

  async show({params, request, response, view}) {
    let desk = await Desk.findOrFail(params.id);

    return {desk};
  }

  async update({params, request, response}) {
    await Desk.query().where({id: params.id}).update(request.only(['qr', 'name']));

    return {message: 'باموفقیت ویرایش شد'};
  }

  async destroy({params, request, response}) {
    let desk = await Desk.findOrFail(params.id);

    desk.delete();

    return {message: 'باموفقیت حذف شد'};
  }
}

module.exports = DeskController
