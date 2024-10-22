import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import notificationReducer from './reducers/notificationReducer.js'
import blogsReducer from './reducers/blogsReducer.js'
import authReducer from './reducers/authReducer.js'
import usersReducers from './reducers/usersReducers.js'
import { combineReducers } from 'redux'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
  authentication: authReducer,
  users: usersReducers,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

// const store = configureStore({
//   reducer: {
//     notification: notificationReducer,
//     blogs: blogsReducer,
//     authentication: authReducer,
//     users: usersReducers,
//   },
// })

console.log(store.getState())
export const persistor = persistStore(store)
export default store
