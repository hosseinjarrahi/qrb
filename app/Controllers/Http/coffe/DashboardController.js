'use strict'

class DashboardController {
  async index({auth, response}) {
    let user = await auth.getUser()

    let coffe = await user.coffe().fetch()

    return {coffe}
  }
}

module.exports = DashboardController
