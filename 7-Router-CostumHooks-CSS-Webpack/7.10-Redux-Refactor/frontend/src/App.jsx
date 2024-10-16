import { useState, useEffect } from 'react'
import Notification from './components/Notification.jsx'

import BlogForm from './components/BlogForm.jsx'
import Togglable from './components/Togglable.jsx'

import { useDispatch, useSelector } from 'react-redux'

import LoginForm from './components/LoginForm.jsx'
import LogoutForm from './components/LogoutForm.jsx'

import { initializeAuth } from './reducers/authReducer.js'
import BlogList from './components/BlogList.jsx'
import { initializeBlogs } from './reducers/blogsReducer.js'

const App = () => {
  const dispatch = useDispatch()

  const { user, athStatus, authError } = useSelector(
    (state) => state.authentication,
  )

  useEffect(() => {
    dispatch(initializeAuth())
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    <div>
      <Notification />
      {user ? (
        <>
          <Togglable buttonLabel="new blog">
            <BlogForm />
          </Togglable>
          <BlogList />
          <LogoutForm />
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  )
}
export default App
