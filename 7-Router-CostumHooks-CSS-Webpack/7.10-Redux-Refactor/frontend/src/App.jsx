import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
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

  const { user, athStatus, authError } = useSelector(state => state.authentication)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeAuth())
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    <div>
      <Notification />
      {user ? (
        <>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <BlogList />
          <LogoutForm/>
        </>
      ) : (
        <LoginForm/>
      )}
    </div>
  )
}
//{username, password, setUser, setUsername, setPassword, setErrorMessage}
export default App

//make line 139 toggle able
