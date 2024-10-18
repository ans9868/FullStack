/*
todo:
Maybe need to add a new backend thingy to get all the posts of a certain user, its in the information of the user in the database so shouldn't be too hard

*Need to add a new aysncThunk function in blogsReducer to return all the blogs of a certain user
*Need to get the use this function here : )
*Next need to polish the component, do the react stuff
*Should I return a new file
*finally, put User:id on the router on App.jsx
 */
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllUsers, getUserBlogs } from '../reducers/usersReducers.js'
import { useEffect } from 'react'
import { initializeBlogs } from '../reducers/blogsReducer.js'

const User = () => {
  const { id: userId } = useParams()
  const { userBlogs, status } = useSelector((state) => state.users)
  const { user } = useSelector((state) => state.authentication) //todo: how come the data doesn't persist to here ? this line works fine in Users.js, need to do the persist memorry thingy
  //const user = { name: 'tempName' } // check redux extension about why being weird
  const dispatch = useDispatch()

  // const { userBlogs, status } = useSelector((state) => state.users)

  useEffect(() => {
    // console.log('User.jsx => useEffect => dispatch(getUserBlogs()')
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
    return <div>loading user's blogs</div>
  }
  return (
    <div>
      <div>User.jsx userId</div>
      <b>
        <h2>{user.name}</h2> <br />
        <h3>Added blogs</h3>
      </b>
      <ul className="added-blogs">
        {userBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
