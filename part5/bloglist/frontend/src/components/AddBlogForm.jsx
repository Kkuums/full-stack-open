import { useState } from 'react'

const AddBlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newBlogUrl,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewBlogUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        Title:{' '}
        <input
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
        />
      </div>
      <div>
        Author:{' '}
        <input
          value={newAuthor}
          onChange={(event) => setNewAuthor(event.target.value)}
        />
      </div>
      <div>
        Url:{' '}
        <input
          value={newBlogUrl}
          onChange={(event) => setNewBlogUrl(event.target.value)}
        />
      </div>
      <div>
        <button type='submit'>create</button>
      </div>
    </form>
  )
}

export default AddBlogForm
