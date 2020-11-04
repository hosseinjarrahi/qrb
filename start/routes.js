'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const User = use('App/Models/User')
const Kavenegar = require('kavenegar');

Route.get('/',() => {
  let message = "کد تایید همدرس: ";

  let api = Kavenegar.KavenegarApi({
    apikey: '4778426C5839394D6562307A64635567314E6C6F426638614478732F6D56696C4B7336626E7857594F6E413D'
  });

  api.VerifyLookup({receptor: '09033144565', token: '123456', template: 'verify'}, (response, status) => {
    // let user = User.query().where('phone', phone).update({active_code: code});
  });

  return 'as'
})

Route.get('/link/:link', 'user/HomeController.index')

Route.post('login', 'AuthController.login').middleware('guest')
Route.post('logout', 'AuthController.logout').middleware('auth')
Route.post('register', 'AuthController.register').middleware('guest')
Route.post('register/verification', 'AuthController.verification');
Route.post('register/resend-code', 'AuthController.resendCode');
Route.post('register/reset-password', 'AuthController.resetPassword');
Route.post('register/change-password', 'AuthController.changePassword');
Route.get('user', 'AuthController.user').middleware('auth')

Route.group(() => {
  Route.resource('/product', 'coffe/ProductController').apiOnly();
  Route.resource('/desk', 'coffe/DeskController').apiOnly();
  Route.resource('/policy', 'coffe/PolicyController').apiOnly();
  Route.resource('/menu', 'coffe/MenuController').apiOnly();
}).prefix('coffe');
// middleware(['auth:jwt'])
