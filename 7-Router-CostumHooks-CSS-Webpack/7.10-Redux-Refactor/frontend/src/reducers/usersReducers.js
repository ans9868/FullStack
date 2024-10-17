import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postNotification } from './notificationReducer.js'
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

const usersReducer = createSlice({
  name: 'users',
  initialState: {
    users: [],
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
        state.status = action.error.message
      })
  },
})

export default usersReducer.reducer
