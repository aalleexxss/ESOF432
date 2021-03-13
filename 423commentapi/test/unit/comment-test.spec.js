'use strict'

const { test } = use('Test/Suite')('Comment Test')
const comment = use('app/Controllers/Http/CommentController.js')

test('add comment', async ({ assert }) => {
  const added = await CommentController.post({
    view: 'w'
  })

  assert.isTrue(added.fails())
})

