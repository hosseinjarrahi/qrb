'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */

/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Coffe {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({request, auth}, next) {
    if (await auth.getUser().isCoffeMan())
      await next()
  }
}

module.exports = Coffe
