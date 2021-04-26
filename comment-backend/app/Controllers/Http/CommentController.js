'use strict'

//Model
const Database = use('Database')
const Comment = use('App/Models/Comment')

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Returns the entire comments database.
 *     responses:
 *       200:
 *         description: Comments returned successfully
 *   post:
 *     summary: Creates a new comment
 *     parameters:
 *       - name: body
 *         description: comment body (text)
 *         required: false
 *         type: string
 *       - name: post_id
 *         description: the UUID of the post
 *         required: false
 *         type: string
 *         format: uuid
 *       - name: comment_id
 *         description: the UUID of the comment
 *         required: false
 *         type: string
 *         format: uuid
 *       - name: parent_id
 *         description: the UUID of the comment that is being replied to (empty if a not a reply)
 *         required: false
 *         type: string
 *         format: uuid
 *       - name: poster
 *         description: the UUID of the person that posted the comment
 *         required: false
 *         type: string
 *         format: uuid
 *       - name: poster_name
 *         description: the name of the comment creator
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Comments created successfully
 * /api/comments/ID:
 *    delete:
 *     summary: Deletes the comment specified
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 * /api/comments/likes/ID:
 *    put:
 *     summary: Adds a like to the comment with that ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 * /api/comments/edit/ID:
 *    put:
 *     summary: Edits a comment with that ID
 *     parameters:
 *       - name: body
 *         description: comment body (text)
 *         required: false
 *         type: string
 *       - name: post_id
 *         description: the UUID of the post
 *         required: false
 *         type: string
 *         format: uuid
 *       - name: comment_id
 *         description: the UUID of the comment
 *         required: false
 *         type: string
 *         format: uuid
 *       - name: parent_id
 *         description: the UUID of the comment that is being replied to (empty if a not a reply)
 *         required: false
 *         type: string
 *         format: uuid
 *       - name: poster
 *         description: the UUID of the person that posted the comment
 *         required: false
 *         type: string
 *         format: uuid
 *       - name: poster_name
 *         description: the name of the comment creator
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 */

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
      updated_at,
      date

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
      updated_at,
      date
    })

    return response.status(201).json({ comment })
  }

  async destroy ({  params, response }) {

    const deleteComment = await Comment.find(params.comment_id)

    await Database.from('comments').where('parent_id', deleteComment.comment_id).delete()

    await deleteComment.delete()

    return response.status(200).json({
      message: 'Comment deleted successfully.'
    })
  }

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
      message: "Comment updated to: " + comments.body
    })

  }
}

module.exports = CommentController
