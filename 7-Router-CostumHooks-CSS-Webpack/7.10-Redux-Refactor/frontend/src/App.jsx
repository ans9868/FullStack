import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login.js'
import Notification from './components/Notification.jsx'
import { postNotification } from './reducers/notificationReducer.js'

import BlogForm from './components/BlogForm.jsx'
import Togglable from './components/Togglable.jsx'

import { useDispatch } from 'react-redux'

import LoginForm from "./components/LoginForm.jsx";
import LogoutForm from "./components/LogoutForm.jsx";

/* custom hooks */
import useLogout from "./hooks/useLogout.js";
const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  // const handleLogout = useLogout()

  //todo: put the blog into the blogReducer
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
    console.log(blogs)
  }, [])

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
  // const handleLogout = async (event) => {
  //   window.localStorage.removeItem('loggedBlogappUser')
  //   window.localStorage.clear()
  // }
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

  //todo: implement blogReducer here, make it so AddLike is done async with thunk in blogReducer with blogService
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


  return (
    <div>
      <Notification />
      {user ? (
        <>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={handleAddBlog} />
          </Togglable>
          {displayBlogs()}
          {LogoutForm()}
        </>
      ) : (
        <LoginForm setUser={setUser} setErrorMessage={setErrorMessage}/>
      )}
    </div>
  )
}
//{username, password, setUser, setUsername, setPassword, setErrorMessage}
export default App

//make line 139 toggle able
