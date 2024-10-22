const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { request, response } = require('express')

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

router.post('/cleanup', async (request, response) => {
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

module.exports = router
