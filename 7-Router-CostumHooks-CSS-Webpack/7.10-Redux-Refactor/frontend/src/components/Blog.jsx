import { useRef } from 'react'
import Togglable from './Togglable.jsx'

//todo: implement with blogsReducer instead of blogRef which I think not needed anymore
const Blog = ({ blog, handleAddLike, handleDelete }) => {
  const blogRef = useRef()

  return (
    <div data-testid="aBlogPost">
      {blog.title}
      <div data-testid="postAuthor"> {blog.author} </div>
      <Togglable buttonLabel="view" ref={blogRef}>
        {blog.url}
        <br />
        <div data-testid="postLikes"> Likes: {blog.likes} </div>
        <button onClick={() => handleAddLike(blog)}> Like!</button>
        <br />
        {blog.user.name} <br />
        <button onClick={() => handleDelete(blog)}>Delete</button> <br />
      </Togglable>
    </div>
  )
}

export default Blog
