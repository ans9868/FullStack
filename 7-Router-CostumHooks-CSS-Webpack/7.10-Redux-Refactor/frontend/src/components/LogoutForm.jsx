import { logout } from '../reducers/authReducer.js'
import { useDispatch } from 'react-redux'

const LogoutForm = () => {
  const dispatch = useDispatch()

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <div>
      <form onSubmit={handleLogout}>
        <button type="submit">Logout</button>
      </form>
    </div>
  )
}

export default LogoutForm
