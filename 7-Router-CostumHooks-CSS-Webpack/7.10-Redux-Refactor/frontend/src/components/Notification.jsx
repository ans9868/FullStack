import { useSelector, useDispatch } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer.js'
import { useEffect } from 'react'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  console.log('notif:' + notification.message)
  console.log('visib:' + notification.visible)
  console.log('duration:' + notification.duration)

  useEffect(() => {
    if (notification.visible) {
      const timer = setTimeout(() => {
        dispatch(clearNotification())
      }, notification.duration || 5000)
      console.log(`Notification posted for: ${notification.duration}`)
      //resets the timer if any of the dependencies ie a new notification prompt comes up
      return () => clearTimeout(timer)
    }
  }, [notification, dispatch])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification.visible ? 'block' : 'none',
  }

  return <div style={style}>{notification.message}</div>
}

export default Notification
