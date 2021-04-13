'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentsSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.string('body')
      table.uuid('post_id')
      table.uuid('comment_id')
      table.uuid('parent_id')
      table.integer('likes')
      table.uuid('poster')
      table.string('poster_name')
      table.string('date')
      table.string('username')
      table.string('password')
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('comments')
  }
}

module.exports = CommentsSchema
