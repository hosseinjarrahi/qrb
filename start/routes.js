'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/link/:link', 'user/HomeController.index')

Route.post('login', 'AuthController.login').middleware('guest')
Route.get('users/:id', 'AuthController.user').middleware('auth')

Route.group(() => {
  Route.resource('/product', 'coffe/ProductController').apiOnly();
  Route.resource('/desk', 'coffe/DeskController').apiOnly();
  Route.resource('/policy', 'coffe/PolicyController').apiOnly();
  Route.resource('/menu', 'coffe/MenuController').apiOnly();
}).prefix('coffe');
// middleware(['auth:jwt'])