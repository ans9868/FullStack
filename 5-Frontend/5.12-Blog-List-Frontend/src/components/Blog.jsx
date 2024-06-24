import { useRef } from 'react'
import Togglable from './Togglable.jsx'
// import blogServices from "../services/blogs.js"

const Blog = ({ blog, handleAddLike, handleDelete }) => {
  const blogRef = useRef()
  console.log(blog)

  // const handleAddLike = async (id) => {
  //     try {
  //         await blogServices.addLike(id)
  //     }catch (error){
  //         console.error("error in adding like to blog")
  //     }
  // }

  return  (
    <div data-testid='aBlogPost'>
      {blog.title}
      <div data-testid='postAuthor'>  { blog.author }   </div>
      <Togglable buttonLabel='view' ref={blogRef}>
        {blog.url}<br/>
        <div data-testid='postLikes'> Likes: {blog.likes} </div>
        <button onClick={() => handleAddLike(blog)}> Like!</button>
        <br/>
        {blog.user.name} <br/>
        <button onClick={() => handleDelete(blog)}>Delete</button> <br/>
      </Togglable>
    </div>
  )
}

//need to add username for 5.9

export default Blog

//make it so on click likes go up