import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationColor, setNotificationColor] = useState('green')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newBlogUrl,
    }

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))

      setNotificationMessage(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

      setNewTitle('')
      setNewAuthor('')
      setNewBlogUrl('')
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('Wrong credentials')
      setNotificationColor('red')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationColor('green')
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    setUser(null)
    window.localStorage.clear()
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleBlogUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification
        message={notificationMessage}
        style={{ color: notificationColor }}
      />

      {user === null ? (
        <div>
          <h2>log in to application</h2>
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </div>
      ) : (
        <div>
          <h3>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </h3>

          <h2>create new</h2>
          <AddBlogForm
            addBlog={addBlog}
            newTitle={newTitle}
            newAuthor={newAuthor}
            newBlogUrl={newBlogUrl}
            handleTitleChange={handleTitleChange}
            handleAuthorChange={handleAuthorChange}
            handleBlogUrlChange={handleBlogUrlChange}
          />

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </>
  )
}

export default App
