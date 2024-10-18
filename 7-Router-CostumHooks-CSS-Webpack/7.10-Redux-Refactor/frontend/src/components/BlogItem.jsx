import { useRef, useState, useEffect } from 'react'
import Togglable from './Togglable.jsx'
import AuthReducer from '../reducers/authReducer.js'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const BlogItem = ({ blog, handleAddLike, handleDelete }) => {
  const blogRef = useRef()
  const [localLikes, setLocalLikes] = useState(blog.likes)

  const handleLocalLike = () => {
    setLocalLikes(localLikes + 1) // Update local UI for likes
    handleAddLike(blog) // Dispatch the like action to Redux

    if (blogRef.current) {
      blogRef.current.show()
    } else {
      console.error('blogRef.current is null or undefined')
    }
  }

  const username = useSelector((state) => state.authentication.user.username)

  return (
    <div data-testid="aBlogPost" key={blog.id}>
      <Link to={`/blogs/${blog.id}`}> {blog.title} </Link>
      <div data-testid="postAuthor"> {blog.author} </div>
      <Togglable buttonLabel="view" ref={blogRef}>
        {blog.url}
        <br />
        <div data-testid="postLikes"> Likes: {localLikes} </div>
        <button onClick={handleLocalLike}> Like!</button>
        <br />
        {blog.user.name} <br />
        {username === blog.user.username ? (
          <button onClick={() => handleDelete(blog)}>Delete</button>
        ) : null}
      </Togglable>
    </div>
  )
}

export default BlogItem
