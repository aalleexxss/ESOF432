'use strict'

const { test, trait } = use('Test/Suite')('Hello World')

trait('Test/Browser')

test('Visit home page', async ({ browser }) => {
  const page = await browser.visit('/')
  await page.assertHas('Documentation')
})

test('Visit comment page', async ({ browser }) => {
  const page = await browser.visit('/comments')
  await page.assertHas('comments')
})
