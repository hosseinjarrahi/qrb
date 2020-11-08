'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const User = use('App/Models/User')
const Kavenegar = require('kavenegar');

Route.get('/link/:link', 'user/HomeController.index')

Route.post('login', 'AuthController.login').middleware('guest')
Route.post('logout', 'AuthController.logout').middleware('auth')
Route.post('register', 'AuthController.register').middleware('guest')
Route.post('register/verification', 'AuthController.verification');
Route.post('register/resend-code', 'AuthController.resendCode');
Route.post('register/reset-password', 'AuthController.resetPassword');
Route.post('register/change-password', 'AuthController.changePassword');
Route.get('user', 'AuthController.user').middleware('auth')
Route.get('user', 'AuthController.user').middleware('auth')

Route.group(() => {
  Route.get('/dashboard', 'coffe/DashboardController.index');
  Route.resource('/product', 'coffe/ProductController').apiOnly();
  Route.resource('/desk', 'coffe/DeskController').apiOnly();
  Route.resource('/policy', 'coffe/PolicyController').apiOnly();
  Route.resource('/menu', 'coffe/MenuController').apiOnly();
}).prefix('coffe');
// middleware(['auth:jwt'])
