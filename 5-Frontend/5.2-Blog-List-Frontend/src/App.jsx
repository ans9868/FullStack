import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login.js'
import Notification from "./components/Notification.jsx";
import blog from "./components/Blog";


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log(`Username ${username} \nPassword ${password}`)
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
      )
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

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.localStorage.clear()
  }




  const loginForm = () =>  (
    <div>
      <h1>Login Form</h1>
      <form onSubmit={handleLogin}>
      <div>
        username
        <input
            type="text"
            value={username}
            name={"Username"}
            onChange={({ target}) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
            type="password"
            value={password}
            name={"Password"}
            onChange={({ target}) => setPassword(target.value)}
        />
      </div>
    <button type="submit">login</button>
    </form>
    </div>
  )

  const displayBlogs = () => (
    <div>
      <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog}/>
    )}
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
        <Notification message={errorMessage}/>
        {user ? (
            <>
            {displayBlogs()}
            {logoutForm()}
            </>
            ) : loginForm()}
      </div>
  )
}

export default App