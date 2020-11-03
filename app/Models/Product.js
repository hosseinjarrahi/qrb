'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {

  menu(){
    return this.belongsTo('App/Models/Menu')
  }

}

module.exports = Product
