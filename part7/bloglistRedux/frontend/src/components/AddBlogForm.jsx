import { useState } from 'react'
import { StyledButton } from './styles/Button.styled'
import { StyledAddBlogForm } from './styles/AddBlogForm.styled'

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
    <StyledAddBlogForm onSubmit={addBlog}>
      <div>
        Title:{' '}
        <input
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
          placeholder='title'
        />
      </div>
      <div>
        Author:{' '}
        <input
          value={newAuthor}
          onChange={(event) => setNewAuthor(event.target.value)}
          placeholder='author'
        />
      </div>
      <div>
        Url:{' '}
        <input
          value={newBlogUrl}
          onChange={(event) => setNewBlogUrl(event.target.value)}
          placeholder='url'
        />
      </div>
      <div>
        <StyledButton type='submit' bghover='#5a5a5a'>
          create
        </StyledButton>
      </div>
    </StyledAddBlogForm>
  )
}

export default AddBlogForm
