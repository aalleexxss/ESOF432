'use strict'

const Route = use('Route')

Route.on('/').render('home')
Route.on('/video').render('video')
Route.get('/comments','CommentController.index')
Route.on('/image').render('image')
Route.on('/text').render('text')
