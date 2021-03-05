'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentsSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.string('body')
      table.uuid('post-id')
      table.uuid('comment-id')
      table.uuid('parent-id')
      table.integer('likes')
      table.uuid('poster')
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('comments')
  }
}

module.exports = CommentsSchema
