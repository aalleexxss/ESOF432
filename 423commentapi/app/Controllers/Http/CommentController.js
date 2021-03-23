'use strict'

//Model
const Comment = use('App/Models/Comment')

class CommentController{

  async index ({ response }) {
    const comments = await Comment.all()

    return response.status(200).json({ comments })
  }

  // async store({ request, response, session }) {
  //   const comment = new Comment();
  //
  //   comment.body = request.input('body')
  //
  //   await comment.save()
  //
  //   session.flash({ notification: 'Comment submitted!'})
  //
  //   return response.status(201).json({comment})
  //
  // }

  async store ({ request, response }) {
    const {
      body,
      post_id,
      comment_id,
      parent_id,
      likes,
      poster,
      id,
      created_at,
      updated_at

    } = request.all()

    const comment = await Comment.create({
      body,
      post_id,
      comment_id,
      parent_id,
      likes,
      poster,
      id,
      created_at,
      updated_at
    })

    return response.status(201).json({ comment })
  }

  // Need to implement edit

  // async edit({ view }) {
  //   return view.render('comment.add')
  // }
  async destroy ({  params, response }) {
    const comments = await Comment.find(params.id)

    await comments.delete()

    return response.status(200).json({
      message: 'Event deleted successfully.'
    })
  }
  // async destroy({ params, session, response }) {
  //
  //   var i = 0;
  //
  //   for(i = 0; i < 1000; i++){
  //
  //     const comment = await Comment.find(i)
  //
  //     if( comment != null){
  //
  //       await comment.delete()
  //
  //     }
  //   }
  //
  //   //session.flash({ notification: 'Comment(s) deleted!'})
  //
  //   return response.status(200).json({
  //     message: 'Comments deleted successfully.'
  //   })
  //
  // }


}

module.exports = CommentController
