import { useReducer, useContext, createContext } from 'react'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload
    case 'LOGOUT':
      return null
    case 'SET_USER':
      return action.payload
    default:
      return state
  }
}

const UserContext = createContext()

export const useUserValue = () => {
  const [user] = useContext(UserContext)
  return user
}

export const useUserDispatch = () => {
  const [, dispatch] = useContext(UserContext)
  return dispatch
}

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, '')

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext
