import {configureStore} from "@reduxjs/toolkit";
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer.js'
import notificationReducer from './reducers/notificationReducer.js'
// import { createStore, combineReducers } from 'redux'


const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        notification: notificationReducer
    }
})

console.log(store.getState())

export default store