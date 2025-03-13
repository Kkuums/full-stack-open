import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { createComment } from '../reducers/blogReducer'

import { StyledButton } from './styles/Button.styled'
import { StyledBlog, StyledButtonDiv } from './styles/Blog.styled'

const Blog = ({ handleBlogLike, handleDelete }) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const blog = useSelector((state) => state.blogs.find((blog) => blog.id === id))

  const handleAddComment = (event) => {
    event.preventDefault()
    dispatch(createComment(blog.id, comment))
    setComment('')
  }

  if (!blog) {
    return null
  }

  return (
    <StyledBlog>
      <h3>
        {blog.title} {blog.author}
      </h3>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes</p>
      <StyledButtonDiv>
        <StyledButton onClick={() => handleBlogLike(blog)} bghover='#6a994e'>
          like
        </StyledButton>{' '}
        <br />
        <StyledButton onClick={() => handleDelete(blog.id)} bghover='#bc4749'>
          remove
        </StyledButton>
      </StyledButtonDiv>
      <p>added by {blog.user.username}</p>
      <div>
        <h3>comments:</h3>
        <ul>
          {blog.comments?.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <form onSubmit={handleAddComment}>
          <input
            type='text'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <StyledButton type='submit' bghover='#5a5a5a'>
            Add comment
          </StyledButton>
        </form>
      </div>
    </StyledBlog>
  )
}

export default Blog
