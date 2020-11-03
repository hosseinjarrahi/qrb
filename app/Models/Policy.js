'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Policy extends Model {

  coffe(){
    return this.belongsTo('App/Models/Coffe')
  }

}

module.exports = Policy
