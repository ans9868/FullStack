const blogsRouter = require('express').Router()
require('express-async-errors')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { request } = require('express')

// const getTokenFrom = request => {
//    const authorization = request.get('authorization')
//     if(authorization && authorization.startsWith('Bearer ')) {
//         return authorization.replace('Bearer ', '')
//     }
//     return null
// }
//

/*
//Old methods with promises
blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})
})
*/

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    //the .populate is to make sure information about the user in included, 1 is the default if its not included since our database is not strict
    username: 1,
    name: 1,
    id: 1,
  }) //errors automatically caught by 'require('express-async-errors')'
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  // const user = await User.findById(body.userId)

  // const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRETE)
  const decodedToken = jwt.verify(request.token, process.env.SECRETE)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  // const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
  // response.status(204).json(deletedBlog)
  const decodedToken = jwt.verify(request.token, process.env.SECRETE)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)
  const blogPoster = await User.findById(blog.user)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  if (user.id !== blogPoster.id.toString()) {
    return response
      .status(401)
      .json({ error: 'user is not the owner of the post' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  user.blogs = user.blogs.filter(
    (blogId) => blogId.toString() !== blog.id.toString(),
  ) //filter out the blog that IS equal to blog.id
  await user.save()

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate('user', { username: 1, name: 1, id: 1 })

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  // await Blog.findByIdAndUpdate(request.params.id, blog, {new : true})
  // const updatedBlog = await Blog.findById(request.params.id)
  response.json(updatedBlog)
})

module.exports = blogsRouter
