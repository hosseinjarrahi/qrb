'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Comment extends Model {

  order() {
    return this.belongsTo('App/Models/Order')
  }

  getOptions(options){
    let parsed = JSON.parse(options)
    return Array.isArray(parsed) ? parsed : []
  }

  setOptions(options){
    return JSON.stringify(options)
  }

}

module.exports = Comment
