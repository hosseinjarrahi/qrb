'use strict'

class AuthController {

  async login({request,auth}) {
    const { phone, password } = request.all()
    return await auth.attempt(phone, password)
  }

  async user({request,response,auth}) {
    if (auth.user.id !== Number(params.id)) {
      return response.json({message:'دسترسی به این بخش مجاز نمی باشد'});
    }
    return auth.user
  }

}

module.exports = AuthController
