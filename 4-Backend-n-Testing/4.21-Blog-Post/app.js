const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')

// const blogsRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')


const mongoose = require('mongoose')
const {error} = require("./utils/logger");

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
    .then(() => {
        logger.info('Connected to MongoDB')
    }).catch(
        logger.error('Error to connection to MongoDB: ', error.message)
)

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.getTokenFrom)

const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)

const usersRouter = require('./controllers/users')
app.use('/api/users', usersRouter)

const loginRouter = require('./controllers/login')
app.use('/api/login', loginRouter)


if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports = app
