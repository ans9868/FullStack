import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer.js'

//todo: add blog and other thingies here that use redux
const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
})

console.log(store.getState())
export default store
