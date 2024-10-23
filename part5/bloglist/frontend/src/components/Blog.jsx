import { useState } from 'react'

const Blog = ({ blog, handleBlogLike, handleDelete, user }) => {
  const [showDetails, setShowDetails] = useState(false)

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
      {blog.title} {showDetails ? '' : blog.author}
      <button onClick={toggleShowDetails}>{showDetails ? 'hide' : 'view'}</button>
      {showDetails && (
        <>
          <br />
          {blog.url} <br />
          likes {blog.likes}
          <button onClick={() => handleBlogLike(blog.id)}>like</button> <br />
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
