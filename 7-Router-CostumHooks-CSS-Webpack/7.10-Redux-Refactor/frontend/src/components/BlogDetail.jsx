import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllUsers, getUserBlogs } from '../reducers/usersReducers.js'
import { useEffect, useState } from 'react'

const BlogDetail = () => {
  const { id: blogId } = useParams()
  const { blogs } = useSelector((state) => state.blogs)
  const [localLikes, setLocalLikes] = useState()

  const handleLocalLike = () => {
    setLocalLikes(localLikes + 1) // Update local UI for likes
    handleAddLike(blog) // Dispatch the like action to Redux

    if (blogRef.current) {
      blogRef.current.show()
    } else {
      console.error('blogRef.current is null or undefined')
    }
  }

  if (blogs.size === 0) {
    return <div>Blogs are loading</div>
  }

  console.log('blogs')
  console.log(JSON.stringify(blogs))
  //**When application scales put this code in a reducer and use a set **
  const blog = blogs.find((blog) => {
    // console.log('blogId             ' + blogId)
    // console.log('blog.id            ' + blog.id)
    // console.log('stringify(blog.id)' + JSON.stringify(blog.id))
    // console.log(blog.id === blogId)

    return blog.id === blogId
  }) //is blog.id a string or json weirdness

  useEffect(() => {
    setLocalLikes(blog.likes)
  }, [blog])

  if (!blog) {
    return <div>Couldn't find blog</div>
  }

  //todo:  put like button
  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <div data-testid="postLikes"> Likes: {localLikes} </div>
      <button onClick={handleLocalLike}> Like!</button>
      <p>added by {blog.author}</p>
    </div>
  )
}

export default BlogDetail
