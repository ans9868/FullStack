import {useSelector, useDispatch, useEffect} from "react"
import { useNotificationDispatch, useNotificationValue } from "../NotificationContext.jsx";

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notificationDispatch = useNotificationDispatch()
  const { display, message } = useNotificationValue()

  console.log(`display: ${display}`)
  console.log(`message: ${message}`)

  useEffect(() => {
    if ( display ) {
      console.log("if display hit")
      const timer = setTimeout( () => {
        notificationDispatch({ type: "HIDE_NOTIFICATION" })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [message, display, notificationDispatch]);

  if (!display) return <></>



  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification