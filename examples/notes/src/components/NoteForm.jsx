import { useState } from 'react'

const NoteForm = ({ onSubmit, handleChange, value }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: true,
    })

    setNewNote('')
  }

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={onSubmit}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default NoteForm
