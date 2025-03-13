import { useSelector } from 'react-redux'

const Notification = ({ style }) => {
  const notification = useSelector((state) => state.notification)

  return (
    <div style={style} className='notification'>
      {notification.message}
    </div>
  )
}

export default Notification
