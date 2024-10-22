const usersRouter = require('express').Router()
const User = require('../models/user')
//const Blog = require("../models/blog");
require('express-async-errors')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (
    username.length < 3 ||
    password.length < 3 ||
    (await User.findOne({ username: request.body.username }))
  ) {
    response.status(422).json({
      error:
        'username or password shorter then 3 characters or username already exists',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

//This is essentially 'getUser'
usersRouter.get('/:id', async (request, response) => {
  const users = await User.findById(request.params.id) //find the id 'getUser'
  response.json(users)
})

//I had a problem where a post would be deleted but it wouldn't be deleted in the user, this was my quickfix
/*
usersRouter.post('/f/cleanup', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    const blogIds = blogs.map((blog) => blog._id.toString())

    const users = await User.find({})

    for (const user of users) {
      const validBlogs = user.blogs.filter((blogId) =>
        blogIds.includes(blogId.toString()),
      ) //has only blogid's that are exist with all the other blogs

      if (validBlogs.length !== user.blogs.length) {
        //if less validblogs then user blogs
        user.blogs = validBlogs
        await user.save()
      }
    }
    response.status(200).json({ message: 'cleanup completed and successful' })
  } catch (error) {
    console.error('Error during cleanup:', error.message)
    response.status(500).json({ error: 'internal server error' })
  }
})
*/

module.exports = usersRouter
