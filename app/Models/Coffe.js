'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Coffe extends Model {

  desks() {
    return this.hasMany('App/Models/Desk');
  }

  orders() {
    return this.hasMany('App/Models/Order');
  }

  menus() {
    return this.hasMany('App/Models/Menu');
  }

  user() {
    return this.belongsTo('App/Models/User');
  }

  users() {
    return this.hasMany('App/Models/User');
  }

  policy() {
    return this.hasOne('App/Models/Policy');
  }

  hasPlan(plan) {
    return this.plans.indexOf(plan) !== -1
  }

  getPlans(plans){
    let parsed = JSON.parse(plans)
    return Array.isArray(parsed) ? parsed : []
  }

  setPlans(plans){
    return JSON.stringify(plans)
  }

}

module.exports = Coffe;
