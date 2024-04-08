const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const {strictEqual} = require("assert");

const api = supertest(app)

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/ )
})

test('blogs have the tag id and not _id', async () => {
    const response = await api.get('/api/blogs')

    const has_id_tag = 'id' in response._body[0]

    strictEqual(has_id_tag, true)
})

after(async () => {
    await mongoose.connection.close()
})

//async/wait above
