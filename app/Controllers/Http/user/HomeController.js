'use strict'

const Coffe = use('App/Models/Coffe')
const Comment = use('App/Models/Comment')
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
    } catch (e) {
    }

    return {coffe}
  }

  async comment({request, auth}) {
    let {rate, coffe_id, body, order_id,options} = request.post()
    let user = {id: null}
    try {
      user = await auth.getUser()
    } catch (e){}
    Comment.create({
      rate,
      coffe_id,
      order_id,
      body,
      options,
      user_id:user.id
    })
  }

}

module.exports = HomeController
