import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState:  {message: '', visible: false },
    reducers: {
        postNotification(state, action){
            console.log('Notification post: ', action.payload)
            state.message = action.payload
            state.visible = true
        },
        clearNotification(state) {
            state.visible = false
            state.message = ''
        }
    }
})

export const { postNotification , clearNotification} = notificationSlice.actions
export default notificationSlice.reducer