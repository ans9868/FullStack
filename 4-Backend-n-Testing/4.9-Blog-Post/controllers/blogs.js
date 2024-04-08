const blogsRouter = require('express').Router()

const Blog = require('../models/blog') //need to uncomment for final product

//Can make edits here to use async/wait. Instructions to do it is in "4.b.async/wait in the backend"

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})




module.exports = blogsRouter