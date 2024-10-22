import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { initializeAuth } from '../reducers/authReducer.js'
import LogoutForm from './LogoutForm.jsx'

const Menu = () => {
  const menuBar = {
    display: 'flex', // Flexbox to align items in a row
    alignItems: 'center', // Vertically align items
    backgroundColor: 'lightgray', // Set background color to grey
    padding: '3px', // Optional: Add some padding for aesthetics
  }
  const menuItem = {
    paddingRight: 5,
    display: ' inline-block',
  }

  const dispatch = useDispatch()
  const { user, status } = useSelector((state) => state.authentication)

  useEffect(() => {
    //status == idle or loading
    if (status === 'idle') {
      dispatch(initializeAuth())
    }
  }, [status, dispatch])

  if (status === 'loading' || !user) {
    return <div>Loading menu ...</div>
  }

  return (
    <div style={menuBar}>
      <Link to="/" style={menuItem}>
        Blogs
      </Link>
      <Link to="/users" style={menuItem}>
        Users
      </Link>
      <div style={menuItem}>{user.username} logged in</div>
      <LogoutForm />
    </div>
  )
}

export default Menu
