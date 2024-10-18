import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postNotification } from './notificationReducer.js'
import users from '../components/Users.jsx'
import user from '../components/UserDetail.jsx'
import { initializeBlogs } from './blogsReducer.js'
const usersUrl = '/api/users'

export const getAllUsers = createAsyncThunk(
  'users/getAll',
  async (_, { getState, rejectWithValue, dispatch }) => {
    console.log(`usersReducers.getAllUsers`)
    try {
      const response = await axios.get(usersUrl)
      console.log(`usersReducers.getAllUsers ${response.data}`)
      return response.data
    } catch (error) {
      dispatch(postNotification({ message: 'Failed to get all users' }))
      rejectWithValue('Failed to load all users')
    }
  },
)

//todo: getUser function here and put it into users so that won't have to dispatch(getAllUsers) when only want 1 user

export const getUserBlogs = createAsyncThunk(
  'users/blogs',
  async (userId, { getState, rejectWithValue, dispatch }) => {
    try {
      const state = getState()
      const allBlogs = state.blogs.blogs
      //sometimes state.blogs.blogs is empty do to race conditions so here is a quick fix
      if (allBlogs.length === 0) {
        await dispatch(initializeBlogs())
        const updatedState = getState()
        const refreshedAllBlogs = updatedState.blogs.blogs
        return refreshedAllBlogs.filter((blog) => blog.user.id === userId)
      }
      // console.log(`allBlogs: ${JSON.stringify(allBlogs)}`)
      return allBlogs.filter((blog) => blog.user.id === userId)
    } catch (error) {
      console.log(`Failed to find & fetch blogs of user of id ${userId}`)
      rejectWithValue(`Failed to find & fetch blogs of user of id ${userId}`)
    }
  },
)

//todo: finish this function here then look at UserDetail.jsx list of what to do

const usersReducer = createSlice({
  name: 'users',
  initialState: {
    users: [],
    userBlogs: [], //a sort of temporary variable for blogs of a certain user/type depending on the want/need
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //initializing getting all the users
      .addCase(getAllUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      //get all the blogs of a certain user
      .addCase(getUserBlogs.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getUserBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.userBlogs = action.payload
      })

      .addCase(getUserBlogs.rejected, (state, action) => {
        state.status = 'failed'
      })
  },
})

export default usersReducer.reducer
