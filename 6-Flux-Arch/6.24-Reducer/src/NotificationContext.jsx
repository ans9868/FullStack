import { createContext, useReducer, useContext } from "react"

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "POST_NOTIFICATION":
            console.log("post")
            return {
                display: true,
                message: action.payload
            }
        case "HIDE_NOTIFICATION":
            return {
                display: false,
                message: ''
            }
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, {display: false, message: ''})
    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () =>{
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () =>{
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}


export default NotificationContext