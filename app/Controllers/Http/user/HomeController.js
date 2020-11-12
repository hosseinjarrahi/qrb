'use strict'

const Coffe = use('App/Models/Coffe')
const moment = use('moment')

class HomeController {

  async index({request, response, auth, params}) {
    let coffe = await Coffe.query().with('menus.products').with('policy').where('link', params.link).first();
    let user = null
    try {
      user = await auth.getUser()
      if (coffe.policy) {
        if (moment().isAfter(user.point_expire)) {
          user.point = 0;
          user.save()
        }
      }
    } catch (e) {}

    return coffe
  }

}

module.exports = HomeController
