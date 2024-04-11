const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const {strictEqual} = require("assert");
require('express-async-errors')


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

test('blog post uploaded to mongodb database', async() => {
    const newBlog = {
        title: "a test blog post",
        author: 'backend testing',
        url: 'http://backend-testing-url.sus',
        likes: '0'
    }


    const initialNotes = await api.get('/api/blogs')

    const initialNotesSize = initialNotes._body.length

    await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

    const postNotes = await api.get('/api/blogs')

    const postNotesSize = postNotes._body.length

    strictEqual(initialNotesSize + 1, postNotesSize)
})


test('testing making then deleting post', async() => {
    const newBlog = {
        title: "a test blog post",
        author: 'backend testing',
        url: 'http://backend-testing-url.sus',
        likes: '0'
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/) //could get the post id right here but I want to make sure the whole functionality works

    const initialBlogs = await api.get('/api/blogs')

    const idToDelete = (initialBlogs._body[initialBlogs._body.length - 1]).id

    await api.delete(`/api/blogs/${idToDelete}`)

    const postBlogs = await api.get('/api/blogs')

    strictEqual(initialBlogs._body.length, postBlogs._body.length + 1)
})






after(async () => {
    await mongoose.connection.close()
})

//async/wait above
