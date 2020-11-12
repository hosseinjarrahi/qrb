'use strict'

const User = use('App/Models/User')

class UserController {
  async index({request, response, auth}) {
    let user = await auth.getUser()
    let coffe = await user.coffe().with('desks').first()

    let users = await User
      .query()
      .where('coffe_id', coffe.id)
      .withCount('orders')
      .fetch();

    return {users};
  }
}

module.exports = UserController
