'use strict'

const User = use('App/Models/User')

class UserController {
    async index({request, response, auth}) {
        let users = await User.query()
        .where('coffe_id', 1).withCount('orders').fetch();
        return {users};
        }
}

module.exports = UserController
