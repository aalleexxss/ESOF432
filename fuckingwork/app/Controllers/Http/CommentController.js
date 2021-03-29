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
      poster_name,
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
      poster_name,
      id,
      created_at,
      updated_at
    })

    return response.status(201).json({ comment })
  }


  async destroy ({  params, response }) {
    const comments = await Comment.find(params.comment_id)

    await comments.delete()

    return response.status(200).json({
      message: 'Comment deleted successfully.'
    })
  }

  // async retrieve ({ params, response }) {
  //
  //   const comments = await Comment.find(params.comment_id)
  //
  //
  //   return response.status(200).json({ comments })
  // }

  async like ({  params, response }) {

    const comments = await Comment.find(params.comment_id)

    comments.likes  = comments.likes + 1

    await comments.save()

    return response.status(200).json({
      message: 'Like added!'
    })
  }

  async edit ({params, request, response})
  {
    const {
      body,
    } = request.all()

    const comments = await Comment.find(params.comment_id)

    comments.body = body

    await comments.save()

    return response.status(200).json({
      message: "Comment updated" + comments.body
    })

  }



}

module.exports = CommentController
