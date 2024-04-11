const blogsRouter = require('express').Router()
require('express-async-errors')
const Blog = require('../models/blog')
const {request, response} = require("express"); //need to uncomment for final product



// Old methods with promises
// blogsRouter.get('/', (request, response) => {
//     Blog
//         .find({})
//         .then(blogs => {
//             response.json(blogs)
//         })
// blogsRouter.post('/', (request, response) => {
//     const blog = new Blog(request.body)
//     blog
//         .save()
//         .then(result => {
//             response.status(201).json(result)
//         })
// })
// })

//new method with async/wait

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}) //errors automatically caught by 'require('express-async-errors')'
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})


blogsRouter.delete('/:id', async (request, response) => {
    // const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
    // response.status(204).json(deletedBlog)
    console.log(request.params)
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})


module.exports = blogsRouter