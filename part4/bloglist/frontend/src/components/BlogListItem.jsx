import './BlogListItem.css'

const BlogListItem = ({ title, author, blogUrl, likes }) => {
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
      </p>
    </div>
  )
}

export default BlogListItem
