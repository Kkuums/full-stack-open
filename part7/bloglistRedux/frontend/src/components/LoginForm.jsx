import { useDispatch } from 'react-redux'
import { setNotificationTimeout } from '../reducers/notificationReducer'

import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

import { StyledButton } from './styles/Button.styled'
import { StyledLoginForm } from './styles/LoginForm.styled'

const LoginForm = ({ username, password, setUsername, setPassword, setUser }) => {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotificationTimeout('Wrong credentials', 'red', 5))
    }
  }

  return (
    <StyledLoginForm onSubmit={handleLogin}>
      <h3>log in to application</h3>
      <div>
        <label>username</label>
        <input
          type='text'
          data-testid='username'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label>password</label>
        <input
          type='password'
          data-testid='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <StyledButton type='submit' bghover='#6a994e'>
        login
      </StyledButton>
    </StyledLoginForm>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
