import { createSlice } from "@reduxjs/toolkit";
import Notification from "../components/Notification.jsx";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        postNotification(state, action){
            console.log('Notification post: ', action.payload)
            return action.payload
        }
    }
})

export const { postNotification } = notificationSlice.actions
export default notificationSlice.reducer