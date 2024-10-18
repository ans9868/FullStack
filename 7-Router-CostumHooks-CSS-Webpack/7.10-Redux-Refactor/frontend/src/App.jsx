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

import Users from './components/Users.jsx'

import ReactDOM from 'react-dom/client'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from 'react-router-dom'
import User from './components/User.jsx'
import { getAllUsers } from './reducers/usersReducers.js'

const App = () => {
  const dispatch = useDispatch()

  const { user, athStatus, authError } = useSelector(
    (state) => state.authentication,
  )

  useEffect(() => {
    dispatch(initializeAuth())
    dispatch(initializeBlogs())
    dispatch(getAllUsers()) //maybe change this because only need to get 1 user for User.jsx
  }, [dispatch])

  return (
    <div>
      <Notification />

      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <>
                <Togglable buttonLabel="new blog">
                  <BlogForm />
                </Togglable>
                <BlogList />
                <LogoutForm />
              </>
            ) : (
              <LoginForm />
            )
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  )
}
export default App
