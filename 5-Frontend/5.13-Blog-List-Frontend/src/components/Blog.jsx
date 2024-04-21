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
    <div className="aBlog">
      {blog.title} { blog.author }
      <Togglable buttonLabel='view' ref={blogRef}>
        {blog.url}<br/>
              Likes: {blog.likes}
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