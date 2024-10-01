import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification.jsx'
import { postNotification } from './reducers/notificationReducer.js'

import BlogForm from './components/BlogForm.jsx'
import Togglable from './components/Togglable.jsx'

import { useDispatch, useSelector } from 'react-redux'

import LoginForm from "./components/LoginForm.jsx";
import LogoutForm from "./components/LogoutForm.jsx";

/* custom hooks */
import {initializeAuth} from "./reducers/authReducer.js";
import BlogList from "./components/BlogList.jsx";
import {initializeBlogs} from "./reducers/blogsReducer.js";

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const { user, athStatus, authError } = useSelector(state => state.authentication)
  const [errorMessage, setErrorMessage] = useState(null)
  console.log(`User in app.jsx:${user}`)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeAuth())
    dispatch(initializeBlogs())
  }, [dispatch])

  //todo: implement blogsReducer here
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

  return (
    <div>
      <Notification />
      {user ? (
        <>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={handleAddBlog} />
          </Togglable>
          <BlogList />
          <LogoutForm/>
        </>
      ) : (
        <LoginForm setErrorMessage={setErrorMessage}/>
      )}
    </div>
  )
}
//{username, password, setUser, setUsername, setPassword, setErrorMessage}
export default App

//make line 139 toggle able
