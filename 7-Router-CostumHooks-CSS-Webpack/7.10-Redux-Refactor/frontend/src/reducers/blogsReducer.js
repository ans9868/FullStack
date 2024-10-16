import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const blogsUrl = '/api/blogs'

import { postNotification } from './notificationReducer.js'

export const initializeBlogs = createAsyncThunk(
  'blogs/initialization',
  async () => {
    const response = await axios.get(blogsUrl)
    return response.data
  },
)

export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (blogId, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`${blogsUrl}/${blogId}`)
      dispatch(postNotification({ message: 'Deleted blog' }))
      return blogId
    } catch (error) {
      dispatch(postNotification({ message: 'Failed to delete blog' }))
      return rejectWithValue('Failed to delete blog')
    }
  },
)

export const addLike = createAsyncThunk(
  'blogs/addLike',
  async (blogObject, { rejectWithValue, dispatch }) => {
    try {
      const newBlogObject = {
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
        likes: blogObject.likes + 1,
      }
      const response = await axios.put(
        `${blogsUrl}/${blogObject.id}`,
        newBlogObject,
      )
      dispatch(postNotification({ message: 'Added like to a blog' }))
      return response.data
    } catch (error) {
      dispatch(postNotification({ message: 'Failed to add like to a blog' }))
      rejectWithValue('Failed to add like')
    }
  },
)

export const addBlog = createAsyncThunk(
  'blogs/addBlog',
  async (newBlog, { getState, rejectWithValue, dispatch }) => {
    try {
      const state = getState()

      const config = {
        headers: { Authorization: `Bearer ${state.blogs.token}` },
      }
      const response = await axios.post(`${blogsUrl}`, newBlog, config)
      dispatch(postNotification({ message: 'A new blog was added!' }))
      dispatch(initializeBlogs())
      return response.data
    } catch (error) {
      dispatch(postNotification({ message: 'Failed to add a new blog' }))
      rejectWithValue('Error in adding blog')
    }
  },
)

const blogsReducer = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    token: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setToken(state, action) {
      console.log(`token set to ${action.payload}`)
      state.token = action.payload.trim()
    },
  },
  extraReducers: (builder) => {
    builder
      //initialize the blogs to the site
      .addCase(initializeBlogs.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(initializeBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // console.log(`succeeded ${action.payload}`)
        state.blogs = action.payload
        // console.log(`state.blogs: ${state.blogs}`)
      })
      .addCase(initializeBlogs.rejected, (state, action) => {
        // console.log("FAILED")
        state.status = 'failed'
        state.error = action.error.message
      })
      //remove/delete a blog from the site
      .addCase(deleteBlog.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.blogs = state.blogs.filter((blog) => blog.id !== action.payload)
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      //adding like
      .addCase(addLike.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addLike.fulfilled, (state, action) => {
        state.status = 'succeeded'
        console.log(`addLike fullfilled ${action.payload}`)
        state.blogs = state.blogs.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog,
        )
      })
      .addCase(addLike.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'An error occurred'
      })
  },
})

export const { setToken } = blogsReducer.actions
export default blogsReducer.reducer
