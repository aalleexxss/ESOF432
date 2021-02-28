'use strict'

const Route = use('Route')

const Database = use('Database')

Route.on('/').render('home')
Route.on('/video').render('video')
Route.get('/comments','CommentController.index')
Route.on('/image').render('image')
Route.on('/text').render('text')

Route.get('/comment/add', 'CommentController.add')

Route.post('/comments', 'CommentController.store')

Route.delete('/comments', 'CommentController.destroy')
