'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')


Route.on('/').render('home')

//Route.on('/react').render('react')

Route.get('api/comments','CommentController.index')

Route.get('api/comments/:id','CommentController.retrieve')

Route.post('api/comments', 'CommentController.store')

Route.delete('api/comments/:id', 'CommentController.destroy')

Route.put('api/comments/likes/:id', 'CommentController.like')
