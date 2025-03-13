import { useReducer, useContext, createContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return {
        message: `a new blog ${action.payload.title} by ${action.payload.author} added`,
        color: 'green',
      }
    case 'WRONG_CRED':
      return { message: 'Wrong credentials', color: 'red' }
    case 'CLEAR':
      return { message: '', color: '' }
    default:
      return state
  }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
  const [notification] = useContext(NotificationContext)
  return notification
}

export const useNotificationDispatch = () => {
  const [, dispatch] = useContext(NotificationContext)
  return dispatch
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
