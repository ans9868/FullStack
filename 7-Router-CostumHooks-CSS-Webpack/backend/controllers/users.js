const usersRouter = require('express').Router()
const User = require('../models/user')
//const Blog = require("../models/blog");
require('express-async-errors')
const bcrypt = require('bcrypt')

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
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  })
  response.json(users)
})

module.exports = usersRouter
