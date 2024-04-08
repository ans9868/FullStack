// const { test, after } = requare('node:test')
// const mongoose = requare('mongoose')
// const supertest = require('supertest')
// const app = require(app)
//
// const api = supertest(app)
//
// test('blogs are returned as json', async () => {
//     await api
//         .get('/api/blogs')
//         .expect(200)
//         .expect('Content-Type', /application\/json/ )
// })
//
// after(async () => {
//     await mongoose.connection.close()
// })

//async/wait above
const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})