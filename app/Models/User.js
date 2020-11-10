'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static boot() {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  tokens() {
    return this.hasMany('App/Models/Token')
  }

  orders() {
    return this.hasMany('App/Models/Order')
  }

  isCoffeMan() {
    return this.role == 'coffe_man'
  }

  coffe() {
    if (this.isCoffeMan())
      return this.hasOne('App/Models/Coffe')
    return this.belongsTo('App/Models/coffe')
  }


  isVerified() {
    return this.phone_verified
  }

}

module.exports = User
