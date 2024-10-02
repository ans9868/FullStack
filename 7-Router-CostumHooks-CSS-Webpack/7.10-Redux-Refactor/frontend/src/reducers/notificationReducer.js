import { createSlice, current } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', duration: 5000, visible: false },
  reducers: {
    postNotification(state, action) {
      console.log('Notification post: ', action.payload)
      state.message = action.payload.message
      state.duration = action.payload.duration || 5000
      state.visible = true
      console.log('updated state: ' + state)
    },
    clearNotification(state) {
      state.visible = false
      state.message = ''
      state.duration = 5000
    },
  },
})

export const { postNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
