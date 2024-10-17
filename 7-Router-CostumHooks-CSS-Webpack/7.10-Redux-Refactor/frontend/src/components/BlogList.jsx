import Blog from './Blog.jsx'
import blogsReducer, { deleteBlog, addLike } from '../reducers/blogsReducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import * as timers from 'timers'
const BlogList = () => {
  const { blogs, status } = useSelector((state) => state.blogs)

  const dispatch = useDispatch()

  /* this logic is to help with setting the Loading message */
  const [displayErr, setDisplayErr] = useState(false)
  useEffect(() => {
    let timer
    if (status === 'failed' || status === 'loading') {
      timer = setTimeout(() => {
        setDisplayErr(true)
      }, 3000)
    } else {
      setDisplayErr(false)
    }

    return () => clearTimeout(timer)
  }, [status])

  if (status === 'failed' && displayErr) {
    return <div>Failed connection. Refresh or contact developer</div>
  } else if (status === 'loading' && displayErr) {
    return <div>Loading ... </div>
  } else if (!blogs || blogs.length === 0) {
    return <div>No blogs available</div>
  }

  const handleDelete = (blog) => {
    dispatch(deleteBlog(blog.id)) // Make sure blogId is passed correctly
  }

  const handleAddLike = (blog) => {
    dispatch(addLike(blog))
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>Blogs</h2>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleAddLike={handleAddLike}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  )
}

export default BlogList
