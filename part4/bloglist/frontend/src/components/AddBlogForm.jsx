const AddBlogForm = ({
  addBlog,
  newTitle,
  newAuthor,
  newBlogUrl,
  newLikes,
  handleTitleChange,
  handleAuthorChange,
  handleBlogUrlChange,
  handleLikesChange,
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
        Likes:{' '}
        <input type='number' value={newLikes} onChange={handleLikesChange} />
      </div>
      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
  )
}

export default AddBlogForm
