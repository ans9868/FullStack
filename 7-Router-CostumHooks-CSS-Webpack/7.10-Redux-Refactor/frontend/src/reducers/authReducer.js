import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
//import loginServce, blogService, logoutService
import blogService from "../services/blogs.js";
import axios from 'axios'

const loginUrl = '/api/login'


export const initializeAuth = createAsyncThunk(
    'auth/initializeAuth',
    async () => {
        const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJson) {
            const user = JSON.parse(loggedUserJson)
            console.log(`initialize Auth UserJson: ${user}`)
            blogService.setToken(user.token)
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            return user
        }
        return null
    }
)

export const login = createAsyncThunk(
    'auth/login', //might need to do some finiking with { username , password } as previously was just credentials
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(loginUrl, { username, password }); //credentials = {username, password}
            const user = response.data
            console.log(`authReducer user from axios:` + user)
            blogService.setToken(user.token) //todo: do this with blog reducer in the future
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            return user
        } catch(error) {
            return rejectWithValue('Invalid credentials')
        }
    }
)

export const logout = createAsyncThunk('auth/logout', async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
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
       builder.addCase(initializeAuth.fulfilled, (state, action) => {
                state.status = 'idle'
                state.user = action.payload.username
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
               state.status = "idle"
               state.error = action.payload
           })
           .addCase(logout.fulfilled, (state) => {
               state.user = null
               state.status = 'idle'
               state.error = null
            })
    }
})

export default authReducer.reducer;