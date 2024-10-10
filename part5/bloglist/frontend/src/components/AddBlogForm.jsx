const AddBlogForm = ({
  addBlog,
  newTitle,
  newAuthor,
  newBlogUrl,
  handleTitleChange,
  handleAuthorChange,
  handleBlogUrlChange,
}) => {
  return (
    <form onSubmit={addBlog}>
      <div>
        Title: <input value={newTitle} onChange={handleTitleChange} />
      </div>
      <div>
        Author: <input value={newAuthor} onChange={handleAuthorChange} />
      </div>
      <div>
        Url: <input value={newBlogUrl} onChange={handleBlogUrlChange} />
      </div>
      <div>
        <button type='submit'>create</button>
      </div>
    </form>
  )
}

export default AddBlogForm
