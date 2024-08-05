import './BlogListItem.css'

const BlogListItem = ({
  title,
  author,
  blogUrl,
  likes,
  handleDelete,
  handleIncreaseLikes,
  handleDecreaseLikes,
}) => {
  return (
    <div className='listItem'>
      <p>
        <strong>Title</strong>: {title}
      </p>
      <p>
        <strong>Author</strong>: {author}
      </p>
      <p>
        <strong>Blog url</strong>: {blogUrl}
      </p>
      <p>
        <strong>Likes</strong>: {likes}
        <button onClick={handleDecreaseLikes}>-</button>
        <button onClick={handleIncreaseLikes}>+</button>
      </p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default BlogListItem
