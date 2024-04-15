import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login.js'
import Notification from "./components/Notification.jsx";


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

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(`Username ${username} \nPassword ${password}`)
    try {
      const user = await loginService.login({
        username, password, })
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

  return (
      <div>
        <Notification message={errorMessage}/>
        {user ? displayBlogs() : loginForm()}
      </div>
  )
}

export default App