import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeUser } from '../reducers/userReducer'

import { StyledMenu } from './styles/Menu.styled'
import { StyledButton } from './styles/Button.styled'

const Menu = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()

    dispatch(removeUser())
    window.localStorage.clear()
  }

  if (!user) {
    return null
  }

  return (
    <StyledMenu>
      <div>
        <Link to='/'>blogs</Link>
        <Link to='/users'>users</Link>
      </div>
      <div>
        {user.name} logged in{' '}
        <StyledButton onClick={handleLogout} bghover='#fca311'>
          logout
        </StyledButton>
      </div>
    </StyledMenu>
  )
}

export default Menu
