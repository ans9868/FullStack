import { useSelector, useDispatch } from 'react-redux'
import usersReducers, { getAllUsers } from '../reducers/usersReducers.js'
import React, { useEffect } from 'react'

const Users = () => {
  const { users, status } = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  // console.log(`users ${JSON.stringify(users)}`)

  if (status === 'failed') {
    return <div>Failed connection. Refresh or contact developer</div>
  } else if (status === 'loading') {
    return <div>Loading ... </div>
  } else if (!users || users.length === 0) {
    return <div>No users available</div>
  }
  //todo: fix the css here at end of project
  return (
    <div>
      <h2>Users</h2>
      <ul className="users-list">
        <li className="header"></li>
        <li className="header">Number of blogs created</li>
        {users.map((user) => (
          <React.Fragment key={user.id}>
            <li>{user.name}</li>
            <li>{user.blogs.length}</li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  )
}
//todo: user.blogs.length seems a little long and not accurate

export default Users
