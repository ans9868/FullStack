import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import blogs from "../services/blogs.js";
import blogService from "../services/blogs.js";
//import blogService from "../services/blogs.js";

const blogsUrl = '/api/blogs'

export const initializeBlogs = createAsyncThunk(
    'blogs/initialization',
    async () => {
      const response = await axios.get(blogsUrl)
      // console.log(`initializeBlogs ${JSON.stringify(response.data)}`)
      return (response.data)
    }
)


export const deleteBlog = createAsyncThunk(
    'blogs/deleteBlog',
    async (blogId, {rejectWithValue}) => {
        try {
            await axios.delete(`${blogsUrl}/${blogId}`)
            return blogId
        }catch(error){
            return rejectWithValue("Failed to delete blog")
        }
    }
)


export const addLike = createAsyncThunk(
    'blogs/addLike',
    async (blogObject, { rejectWithValue}) => {
        try{
         const newBlogObject = {
            title: blogObject.title,
            author: blogObject.author,
            url: blogObject.url,
            likes: blogObject.likes + 1,
        }
        const response = await axios.put(`${blogsUrl}/${blogObject.id}`, newBlogObject)
        return response.data
    }catch(error){
        rejectWithValue("Failed to add like")
        }
    }
)




export const addBlog = createAsyncThunk(
    "blogs/addBlog",
    async(newBlog, { getState, rejectWithValue, dispatch}) => {
        try{
            const state = getState()

            const config = {
                headers: { Authorization: `Bearer ${state.blogs.token}` },
            }
            const response = await axios.post(`${blogsUrl}`, newBlog, config)
            dispatch(initializeBlogs())
            return response.data
        }catch(error){
            rejectWithValue("Error in adding blog")
        }
    }
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
      setToken(state, action){
          console.log(`token set to ${action.payload}`)
          state.token = (action.payload).trim()
      }
  },
  extraReducers: (builder) => {
    builder
        //initialize the blogs to the site
        .addCase(initializeBlogs.pending, (state) => {
          state.status = 'loading'
        })
        .addCase(initializeBlogs.fulfilled, (state, action) =>{
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
            state.status = "succeeded"
            console.log(`addLike fullfilled ${action.payload}`)
            state.blogs = state.blogs.map((blog) => blog.id === action.payload.id ? action.payload : blog)
        })
        .addCase(addLike.rejected, (state, action) => {
           state.status = 'failed'
           state.error = action.payload || 'An error occurred'
      })
  }
})

export const { setToken } = blogsReducer.actions
export default blogsReducer.reducer
