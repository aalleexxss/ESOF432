'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.timestamps()
      table.uuid('post-id')
      table.integer('post_type').notNullable()
      table.string('post_content').notNullable()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostsSchema
