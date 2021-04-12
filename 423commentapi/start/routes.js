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

Route.get('api/comments','CommentController.index')

Route.post('api/comments', 'CommentController.store')

Route.delete('api/comments/:comment_id', 'CommentController.destroy')

Route.put('api/comments/likes/:comment_id', 'CommentController.like')

Route.put('api/comments/edit/:comment_id', 'CommentController.edit')
