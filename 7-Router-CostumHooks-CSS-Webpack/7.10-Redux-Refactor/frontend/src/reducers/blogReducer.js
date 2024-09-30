//functions: initiate , addlike

import { createSlice } from '@reduxjs/toolkit'

const blogReducer = createSlice({
  initialState: {
    author: null,
    id: null,
    likes: null,
    title: null,
    URL: null,
  },
  reducers: {
    //todo: need to use async through thunk
    createBlog(action, state) {},
    addLike: { action, state },
  },
})

export {}

export default blogReducer
