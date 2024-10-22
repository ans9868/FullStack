import { useRef, useState, useEffect } from 'react'
import Togglable from './Togglable.jsx'
import AuthReducer from '../reducers/authReducer.js'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const BlogItem = ({ blog, handleAddLike, handleDelete }) => {
  const blogRef = useRef()
  const [localLikes, setLocalLikes] = useState(blog.likes)

  return (
    <div data-testid="aBlogPost" key={blog.id}>
      <Link to={`/blogs/${blog.id}`}> {blog.title} </Link>
    </div>
  )
}

export default BlogItem
