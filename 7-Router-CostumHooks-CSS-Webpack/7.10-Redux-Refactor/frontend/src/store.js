import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer.js'
import blogsReducer from "./reducers/blogsReducer.js";
import authReducer from "./reducers/authReducer.js";

//todo: add blog and other thingies here that use redux
const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    authentication:  authReducer,
  },
})

console.log(store.getState())
export default store
