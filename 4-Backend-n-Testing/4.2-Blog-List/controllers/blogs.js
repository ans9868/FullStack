const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// const {response, request} = require("express");

blogsRouter.get('/', (request, response) => {
    console.log("GET /api/blogs route hit")
    Blog.find({}).then(blogs => {
        response.json(blogs)
    }).catch(error => {
        console.error('Error fetching blogs:', error)
        response.status(500).json({error: 'internal server error'})
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