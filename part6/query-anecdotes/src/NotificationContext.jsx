import { useReducer } from 'react'
import { useContext } from 'react'
import { createContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'VOTE':
      return `anecdote '${action.payload.content}' voted`
    case 'CREATE':
      return `anecdote '${action.payload.content}' created`
    case 'CLEAR':
      return ''
    case 'ERROR':
      return 'anecdote must be at least 5 characters long'
    default:
      return state
  }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
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
