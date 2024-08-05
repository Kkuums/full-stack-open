import BlogListItem from './BlogListItem'

const BlogList = ({
  blogs,
  handleDelete,
  handleIncreaseLikes,
  handleDecreaseLikes,
}) => {
  return (
    <div>
      {blogs.map((blog) => (
        <BlogListItem
          key={blog.id}
          title={blog.title}
          author={blog.author}
          blogUrl={blog.url}
          likes={blog.likes}
          handleDelete={() => handleDelete(blog.id)}
          handleIncreaseLikes={() => handleIncreaseLikes(blog.id)}
          handleDecreaseLikes={() => handleDecreaseLikes(blog.id)}
        />
      ))}
    </div>
  )
}

export default BlogList
