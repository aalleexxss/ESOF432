'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentsSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.increments()
      table.timestamps()
      table.uuid('post-id')
      table.uuid('comment-id')
      table.uuid('parent-id')
      table.string('comment-text')
      table.integer('likes')
      table.uuid('poster')
    })
  }

  down () {
    this.drop('comments')
  }
}

module.exports = CommentsSchema
