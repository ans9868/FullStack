import { logout } from '../reducers/authReducer.js'
import { useDispatch } from 'react-redux'

const LogoutForm = () => {
  const logoutButton = {
    display: 'inline-block',
  }
  const dispatch = useDispatch()

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <div style={logoutButton}>
      <form onSubmit={handleLogout}>
        <button type="submit">Logout</button>
      </form>
    </div>
  )
}

export default LogoutForm
