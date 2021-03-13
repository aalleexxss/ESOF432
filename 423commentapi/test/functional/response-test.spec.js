'use strict'

const { test, trait } = use('Test/Suite')('Response Test')
trait('Test/ApiClient')


test('should be able to create comment through HTTP.', async ({ assert, client }) => {
  let data = {
    body: 'what is up?',
    post_id: 'asdfavserab',
    comment_id: 'asdrt356sdfn',
    parent_id: 'asdfsfd6982h',
    poster: 'Alex'
  }

  const response = await client
                   .post('/comments.store')
                   .send(data)
                   .end()

  response.assertStatus(200)
  response.assertJSONSubset(data)
}).timeout(0)
