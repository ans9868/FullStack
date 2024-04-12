const usersRouter = require('express').Router()
const User = require('../models/User')
const {request, response} = require("express"); //need to uncomment for final product
require('express-async-errors')
const bcrypt  = require('bcrypt')

usersRouter.post('/', async (request, response) => {
    const {username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User ({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})


usersRouter.get('/', async (request, response) => {
    const blogs = await User.find({})
    response.json(blogs)
})

module.exports = usersRouter