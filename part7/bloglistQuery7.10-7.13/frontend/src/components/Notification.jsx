import { useNotificationValue } from '../NotificationContext'

const Notification = ({ message, style }) => {
  const notification = useNotificationValue()

  if (!notification.message) return null

  const notificationStyle = {
    color: notification.color,
  }

  return (
    <div style={notificationStyle} className='notification'>
      {notification.message}
    </div>
  )
}

export default Notification
