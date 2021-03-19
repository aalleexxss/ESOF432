'use strict'

const Route = use('Route')


Route.on('/').render('home')

Route.on('/second').render('secondpost')

Route.get('/comments','CommentController.index')

Route.post('/comments', 'CommentController.store')

Route.delete('/comments', 'CommentController.destroy')
