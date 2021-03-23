'use strict'

//Model
const Comment = use('App/Models/Comment')

class CommentController{

  async index ({ response }) {
    const comments = await Comment.all()

    return response.status(200).json({ comments })
  }


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

  async destroy ({  params, response }) {
    const comments = await Comment.find(params.id)

    await comments.delete()

    return response.status(200).json({
      message: 'Comment deleted successfully.'
    })
  }

  async like ({  params, response, request }) {

    const likes = request.input("likes")

    const comments = await Comment.find(params.id)

    comments.likes  = comments.likes + 1

    await comments.save()

    return response.status(200).json({
      message: 'Like added!'
    })
  }


}

module.exports = CommentController
