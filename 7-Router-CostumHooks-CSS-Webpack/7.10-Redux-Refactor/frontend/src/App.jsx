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
import UserDetail from './components/UserDetail.jsx'
import { getAllUsers } from './reducers/usersReducers.js'
import BlogDetail from './components/BlogDetail.jsx'
import Menu from './components/Menu.jsx'

const App = () => {
  const dispatch = useDispatch()

  const { user, athStatus, authError } = useSelector(
    (state) => state.authentication,
  )

  useEffect(() => {
    dispatch(initializeAuth())
    dispatch(initializeBlogs())
    dispatch(getAllUsers()) //maybe change this because only need to get 1 user for UserDetail.jsx
  }, [dispatch])
  // const Menu = () => {
  //   const menuItem = {
  //     paddingRight: 5,
  //   }
  //   const menuBar = {}
  //   return (
  //     <div style={menuBar}>
  //       <Link to="/" style={menuItem}>
  //         Blogs
  //       </Link>
  //       <Link to="/users" style={menuItem}>
  //         Users
  //       </Link>
  //     </div>
  //   )
  // }

  return (
    <div>
      <Notification />
      {user ? <Menu /> : null}
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
              </>
            ) : (
              <LoginForm />
            )
          }
        />
        <Route path="/users" element={user ? <Users /> : <Navigate to="/" />} />
        <Route
          path="/users/:id"
          element={user ? <UserDetail /> : <Navigate to="/" />}
        />
        <Route
          path="/blogs/:id"
          element={user ? <BlogDetail /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  )
}
export default App
