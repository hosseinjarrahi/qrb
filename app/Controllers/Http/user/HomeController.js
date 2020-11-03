'use strict'

const Coffe = use('App/Models/Coffe')
const User = use('App/Models/User')

class HomeController {

  async index({request, response}) {
    let coffe = await Coffe.query().with('menus.products').where('link', request.get().link).first();

    return coffe
  }

}

module.exports = HomeController
