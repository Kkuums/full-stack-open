import { useEffect, useState } from 'react'
import blogService from './services/blogs'

import AddBlogForm from './components/AddBlogForm'
import BlogList from './components/BlogList'

const App = () => {
  const [blogs, setBlogs] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newLikes, setNewLikes] = useState('')

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs)
    })
  }, [])

  if (!blogs) {
    return null
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newBlogUrl,
      likes: newLikes,
    }

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewBlogUrl('')
      setNewLikes('')
    })
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

  const handleLikesChange = (event) => {
    setNewLikes(event.target.value)
  }

  const handleDelete = async (id) => {
    const blog = blogs.find((b) => b.id === id)

    if (window.confirm(`Delete ${blog.title}?`)) {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter((b) => b.id !== id))
    }
  }

  const handleIncreaseLikes = async (id) => {
    const blog = blogs.find((b) => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    const updatedBlog = await blogService.update(id, changedBlog)
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
  }

  const handleDecreaseLikes = async (id) => {
    const blog = blogs.find((b) => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes - 1 }

    const updatedBlog = await blogService.update(id, changedBlog)
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
  }

  return (
    <div>
      <h1>Bloglist</h1>
      <h2>Add a new entry</h2>

      <AddBlogForm
        addBlog={addBlog}
        newTitle={newTitle}
        newAuthor={newAuthor}
        newBlogUrl={newBlogUrl}
        newLikes={newLikes}
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange}
        handleBlogUrlChange={handleBlogUrlChange}
        handleLikesChange={handleLikesChange}
      />

      <h2>Blog list</h2>
      <BlogList
        blogs={blogs}
        handleDelete={handleDelete}
        handleIncreaseLikes={handleIncreaseLikes}
        handleDecreaseLikes={handleDecreaseLikes}
      />
    </div>
  )
}

export default App
