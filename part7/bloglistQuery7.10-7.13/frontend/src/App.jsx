import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useUserDispatch, useUserValue } from './UserContext'

import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useUserDispatch()
  const user = useUserValue()

  useEffect(() => {
    const loggedUser = JSON.parse(
      window.localStorage.getItem('loggedBlogappUser')
    )
    if (loggedUser) {
      dispatch({ type: 'SET_USER', payload: loggedUser })
    }
  }, [dispatch])

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
  })

  const blogs = result.data

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const blogFormRef = useRef()

  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  if (result.isError) {
    return <div>Error fetching data...</div>
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification />

      {user === null ? (
        <div>
          <h2>log in to application</h2>
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </div>
      ) : (
        <div>
          <h3>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </h3>

          <h2>create new</h2>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <AddBlogForm />
          </Togglable>

          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} user={user} />
            ))}
        </div>
      )}
    </>
  )
}

export default App
