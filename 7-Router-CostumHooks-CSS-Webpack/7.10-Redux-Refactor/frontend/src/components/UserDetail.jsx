import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllUsers, getUserBlogs } from '../reducers/usersReducers.js'
import { useEffect } from 'react'
import BlogItem from './BlogItem.jsx'
import { addLike, deleteBlog } from '../reducers/blogsReducer.js'

const UserDetail = () => {
  const { id: userId } = useParams()
  const { userBlogs, status } = useSelector((state) => state.users)
  const { user } = useSelector((state) => state.authentication) //todo: how come the data doesn't persist to here ? this line works fine in Users.js, need to do the persist memorry thingy
  //const user = { name: 'tempName' } // check redux extension about why being weird
  const dispatch = useDispatch()

  // const { userBlogs, status } = useSelector((state) => state.users)

  useEffect(() => {
    // console.log('UserDetail.jsx => useEffect => dispatch(getUserBlogs()')
    const fetchData = async () => {
      try {
        await dispatch(getUserBlogs(userId))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [dispatch, userId])

  //have everything : )  , now need to organize it in the <div>
  // console.log(`userBlogs ${JSON.stringify(userBlogs)}`)
  if (user === null) {
    return <div>loading user information</div>
  }
  if (userBlogs.length === 0) {
    return <div>loading user's blogs or they haven't posted anything</div>
  }
  return (
    <div>
      <b>
        <h2>{user.name}</h2> <br />
        <h3>Added blogs</h3>
      </b>
      <ul className="added-blogs">
        {userBlogs.map((blog) => (
          <BlogItem
            key={blog.id}
            blog={blog}
            handleAddLike={() => {
              dispatch(addLike())
            }}
            handleDelete={() => {
              dispatch(deleteBlog(blog.id))
            }}
          />
        ))}
      </ul>
    </div>
  )
}

export default UserDetail
