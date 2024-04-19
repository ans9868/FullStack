import {useRef} from "react"
import Togglable from "./Togglable.jsx";
const Blog = ({ blog }) => {
  const blogRef = useRef()
    console.log(blog)
  return  (
      <div>
        {blog.title} {blog.author}
          <Togglable buttonLabel='view' ref={blogRef}>
              {blog.url}<br/>
              Likes: {blog.likes} <button> Like!</button>
              <br/>
          </Togglable>
      </div>
  )
}

export default Blog

//make it so on click likes go up