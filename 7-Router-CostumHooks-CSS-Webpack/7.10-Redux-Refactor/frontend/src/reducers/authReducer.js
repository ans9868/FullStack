import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setToken } from '../reducers/blogsReducer.js'

const loginUrl = '/api/login'

export const initializeAuth = createAsyncThunk(
  'auth/initializeAuth',
  async (_, { dispatch }) => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      await dispatch(setToken(user.token))
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      return user
    }
    return null
  },
)

export const login = createAsyncThunk(
  'auth/login', //might need to do some finiking with { username , password } as previously was just credentials
  async ({ username, password }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(loginUrl, { username, password }) //credentials = {username, password}
      const user = response.data
      console.log(`authReducer user from axios:` + user)
      console.log(`token set to ${user.token}`)
      await dispatch(setToken(user.token))
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      return user
    } catch (error) {
      return rejectWithValue('Invalid credentials')
    }
  },
)

export const logout = createAsyncThunk('auth/logout', async () => {
  window.localStorage.removeItem('loggedBlogappUser')
  // todo: refresh page here or else logout button no work
  return null
})

const authReducer = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.status = 'idle'
        state.user = action.payload ? action.payload.username : null
        state.error = null
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
        console.log(`Login fulfilled, user is here: ${state.user}`)
        state.error = null
      })
      .addCase(login.rejected, (state) => {
        state.user = null
        state.status = 'idle'
        state.error = action.payload
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.status = 'idle'
        state.error = null
      })
  },
})

export default authReducer.reducer
