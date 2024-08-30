import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login.js'
import Notification from './components/Notification.jsx'

import BlogForm from './components/BlogForm.jsx'
import Togglable from './components/Togglable.jsx'

import { useDispatch } from 'react-redux'
import { postNotification } from './reducers/notificationReducer.js'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  //todo: put the blog into the blogReducer
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
    console.log(blogs)
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log(`Username ${username} \nPassword ${password}`)
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  //todo: need to look and see if need to delete blog in blogReducer *i dought i do but check
  const handleDelete = async (blogObject) => {
    console.log('delete triggered')
    try {
      await blogService.remove(blogObject)
      const blogIndex = blogs.filter((blog) => blog.id === blogObject.id)
      if (blogIndex !== -1) {
        const updatedBlogs = blogs.filter((blog) => blog.id !== blogObject.id)
        setBlogs(updatedBlogs)
      } else {
        console.log('Some but happened deleting the object properly')
      }
    } catch (error) {
      setErrorMessage('Blog unable to be deleted')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.localStorage.clear()
  }
  //todo: implement blogReducer here
  const handleAddBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try {
      const responseBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(responseBlog))

      dispatch(postNotification({ message: 'A new blog was added!' }))
    } catch (exception) {
      dispatch(postNotification({ message: 'Blog unable to be posted' }))
    }
  }

  //todo: implement blogReducer here, make it so addLick is done async with thunk in blogReducer with blogService
  const handleAddLike = async (blogObject) => {
    try {
      const updatedBlog = await blogService.addLike(blogObject)
      const index = blogs.findIndex((blog) => blog.id === updatedBlog.id)

      if (index !== -1) {
        const updatedBlogs = [...blogs]
        updatedBlogs[index] = updatedBlog
        setBlogs(updatedBlogs)
      } else {
        //throw error
        throw errorMessage('Error in adding like to blog')
        // dispatch(postNotification({ message: 'Error: unable to add like' }))
      }
    } catch (error) {
      dispatch(postNotification({ message: 'Error: unable to add like' }))
      console.error('Error in adding like to blog')
    }
  }

  const loginForm = () => (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid="username"
            type="username"
            value={username}
            name={'Username'}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            type="password"
            value={password}
            name={'Password'}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button data-testid="loginButton" type="submit">
          login
        </button>
      </form>
    </div>
  )

  const displayBlogs = () => (
    <div>
      <h2>blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes) //sort here, -1 means put a first, 1 means put b first
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleAddLike={handleAddLike}
            handleDelete={handleDelete}
          />
        ))}
    </div>
  )

  const logoutForm = () => (
    <div>
      <form onSubmit={handleLogout}>
        <button type="submit">Logout</button>
      </form>
    </div>
  )

  return (
    <div>
      <Notification />
      {user ? (
        <>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={handleAddBlog} />
          </Togglable>
          {displayBlogs()}
          {logoutForm()}
        </>
      ) : (
        loginForm()
      )}
    </div>
  )
}

export default App

//make line 139 toggle able
