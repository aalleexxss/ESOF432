'use strict'

//Model
const Comment = use('App/Models/Comment')

class CommentController{

  async index({ view }) {

    const comments = await Comment.all();

    return view.render('comments.index', {
      title: 'Comment Data: ',
      comments: comments.toJSON()
    })
  }

  async add({ view }) {
    return view.render('comment.add')
  }

  async store({ request, response, session }) {
    const comment = new Comment();

    comment.body = request.input('body')

    await comment.save()

    session.flash({ notification: 'Comment submitted!'})

    return response.redirect('/comments')

  }

  // Need to implement edit

  // async edit({ view }) {
  //   return view.render('comment.add')
  // }

  async destroy({ params, session, response }) {

    var i = 0;

    for(i = 0; i < 1000; i++){

      const comment = await Comment.find(i)

      if( comment != null){

        await comment.delete()

      }
    }

    session.flash({ notification: 'Comment(s) deleted!'})

    return response.redirect('/comments')


  }

}

module.exports = CommentController
