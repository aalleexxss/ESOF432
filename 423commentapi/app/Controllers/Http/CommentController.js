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
}

module.exports = CommentController
