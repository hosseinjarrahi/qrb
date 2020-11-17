'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

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
Route.post('comment', 'user/HomeController.comment')
Route.post('membership', '/MembershipController.store')
Route.get('order/coffe/:coffeId/desk/:deskId', 'user/HomeController.order')


Route.group(() => {
  Route.get('/dashboard', 'coffe/DashboardController.index');
  Route.resource('/product', 'coffe/ProductController').apiOnly();
  Route.resource('/desk', 'coffe/DeskController').apiOnly();
  Route.resource('/policy', 'coffe/PolicyController').apiOnly();
  Route.resource('/menu', 'coffe/MenuController').apiOnly();
  Route.put('/order/:id/close', 'coffe/OrderController.close').as('order.close');
  Route.resource('/order', 'coffe/OrderController').apiOnly();
  Route.resource('/user', 'coffe/UserController');
  Route.get('/comment/active', 'coffe/CommentController.show_active').as('comment.show.active');
  Route.resource('/comment', 'coffe/CommentController');
  Route.get('/comment/active', 'coffe/CommentController.show_active').as('comment.show.active');
}).prefix('coffe').middleware(['auth:jwt']);
