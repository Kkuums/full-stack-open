import loginService from '../services/login'
import noteService from '../services/notes'

const LoginForm = ({
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  setErrorMessage,
  setUser,
  setUsername,
  setPassword,
}) => {
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input type='text' value={username} onChange={handleUsernameChange} />
        </div>

        <div>
          password
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
