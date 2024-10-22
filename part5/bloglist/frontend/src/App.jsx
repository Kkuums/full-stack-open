import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))

      setNotificationMessage(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    })
  }

  const handleLogout = (event) => {
    event.preventDefault()

    setUser(null)
    window.localStorage.clear()
  }

  const handleBlogLike = async (id) => {
    const blog = blogs.find((b) => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    const updatedBlog = await blogService.update(id, changedBlog)
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
  }

  const handleDelete = async (id) => {
    const blog = blogs.find((b) => b.id === id)

    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter((b) => b.id !== id))
    }
  }

  const blogFormRef = useRef()

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
            setUser={setUser}
            setNotificationMessage={setNotificationMessage}
            setNotificationColor={setNotificationColor}
          />
        </div>
      ) : (
        <div>
          <h3>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </h3>

          <h2>create new</h2>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <AddBlogForm createBlog={addBlog} />
          </Togglable>

          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleBlogLike={handleBlogLike}
                handleDelete={handleDelete}
                user={user}
              />
            ))}
        </div>
      )}
    </>
  )
}

export default App
