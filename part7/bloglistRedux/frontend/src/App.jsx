import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { setNotificationTimeout } from './reducers/notificationReducer'
import {
  addLike,
  createBlog,
  deleteBlog,
  initializeBlogs,
} from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Menu from './components/Menu'
import Users from './components/Users'
import User from './components/User'

import GlobalStyle from './components/styles/GlobalStyle'
import {
  StyledContainer,
  StyledParagraph,
} from './components/styles/Container.styled'

const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      dispatch(createBlog(returnedBlog))

      dispatch(
        setNotificationTimeout(
          `a new blog ${blogObject.title} by ${blogObject.author} added`,
          'green',
          5
        )
      )
    })
  }

  const handleBlogLike = async (blog) => {
    dispatch(addLike(blog.id))
  }

  const handleDelete = async (id) => {
    const blog = blogs.find((b) => b.id === id)

    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(id))
    }
  }

  const blogFormRef = useRef()

  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  return (
    <>
      <GlobalStyle />
      <Menu />
      <StyledContainer>
        <h1>blogs</h1>
        {notification.message && (
          <Notification style={{ color: notification.color }} />
        )}

        {user && (
          <div>
            <Routes>
              <Route
                path='/blogs/:id'
                element={
                  <Blog
                    handleBlogLike={handleBlogLike}
                    handleDelete={handleDelete}
                  />
                }
              />
              <Route path='/users/:id' element={<User />} />
              <Route path='/users' element={<Users />} />
              <Route
                path='/'
                element={
                  <>
                    <h3>create new:</h3>
                    <Togglable buttonLabel='new blog' ref={blogFormRef}>
                      <AddBlogForm createBlog={addBlog} />
                    </Togglable>

                    {[...blogs]
                      .sort((a, b) => b.likes - a.likes)
                      .map((blog) => (
                        <Link key={blog.id} to={`/blogs/${blog.id}`}>
                          <StyledParagraph>{blog.title}</StyledParagraph>
                        </Link>
                      ))}
                  </>
                }
              />
            </Routes>
          </div>
        )}

        {!user && (
          <>
            <LoginForm
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              setUser={setUser}
            />
          </>
        )}
      </StyledContainer>
    </>
  )
}

export default App
