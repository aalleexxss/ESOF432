'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentsSchema extends Schema {
  up () {
    this.create('commentdb', (table) => {
      table.string('body')
      table.uuid('post_id')
      table.uuid('comment_id')
      table.uuid('parent_id')
      table.integer('likes')
      table.uuid('poster')
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('commentdb')
  }
}

module.exports = CommentsSchema
