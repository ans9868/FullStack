import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login.js'
import Notification from "./components/Notification.jsx";

import BlogForm from "./components/BlogForm.jsx";
import Togglable from "./components/Togglable.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [positiveMessage, setPositiveMessage] = useState(null) //for creating new blog // const [title, setTitle] = useState([])
  // const [author, setAuthor] = useState([])
  // const [URL, setURL] = useState([])

  const blogFormRef = useRef()


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

  const handleAddBlog = async ( blogObject ) => {
    blogFormRef.current.toggleVisibility()

    try{
      const responseBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(responseBlog))
     setPositiveMessage('A new blog was added!')
      setTimeout(() => {
      setPositiveMessage(null)
      }, 5000)

    }catch (exception) {
      setErrorMessage('Blog unable to be posted')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () =>  (
    <div>
      <h2>Login Form</h2>
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
        <Notification message={positiveMessage}/>
        {user ? (
            <>
              <Togglable buttonLabel='new blog' ref={blogFormRef}>
                <BlogForm createBlog={handleAddBlog}/>
              </Togglable>
              {displayBlogs()}
              {logoutForm()}
            </>
        ) : loginForm()}
      </div>
  )
}

export default App
