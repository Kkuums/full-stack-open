import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'

import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
  const [showDetails, setShowDetails] = useState(false)
  const queryClient = useQueryClient()

  const updateBlogMutation = useMutation({
    mutationFn: ({ id, newObject }) => blogService.update(id, newObject),
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const updatedBlogs = blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
      queryClient.setQueryData(['blogs'], updatedBlogs)
    },
  })

  const handleBlogLike = async (blog) => {
    updateBlogMutation.mutate({
      id: blog.id,
      newObject: { ...blog, likes: blog.likes + 1 },
    })
  }

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (_, id) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const updatedBlogs = blogs.filter((b) => b.id !== id)
      queryClient.setQueryData(['blogs'], updatedBlogs)
    },
  })

  const handleDelete = async (id) => {
    const blogs = queryClient.getQueryData(['blogs'])

    const blog = blogs.find((b) => b.id === id)

    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate(id)
    }
  }

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {showDetails ? '' : `by ${blog.author}`}
      <button onClick={toggleShowDetails}>{showDetails ? 'hide' : 'view'}</button>
      {showDetails && (
        <>
          <br />
          {blog.url} <br />
          likes {blog.likes}
          <button onClick={() => handleBlogLike(blog)}>like</button> <br />
          {blog.author} <br />
          {user.username === blog.user.username ? (
            <button onClick={() => handleDelete(blog.id)}>remove</button>
          ) : null}
        </>
      )}
    </div>
  )
}

export default Blog
