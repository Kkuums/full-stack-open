import BlogListItem from './BlogListItem'

const BlogList = ({ blogs }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <BlogListItem
          key={blog.id}
          title={blog.title}
          author={blog.author}
          blogUrl={blog.url}
          likes={blog.likes}
        />
      ))}
    </div>
  )
}

export default BlogList
