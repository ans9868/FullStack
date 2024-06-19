import { createSlice } from "@reduxjs/toolkit";
import Notification from "../components/Notification.jsx";

const notificationSlice = createSlice({
    name: 'notification',
    initialState:  {message: '', visible: false },
    reducers: {
        postNotification(state, action){
            console.log('Notification post: ', action.payload)
            // if (state.message !== ''){
            //     clearNotification(state)
            // }
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