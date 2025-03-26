import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from './queries'
import Select from 'react-select'

const BornForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR)

  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  })

  if (authors.loading) {
    return <div>loading...</div>
  }

  const submit = (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, setBornTo: parseInt(born) } })

    setName('')
    setBorn('')
  }

  const options = authors.data.allAuthors.map((author) => ({
    value: author.name,
    label: author.name,
  }))

  return (
    <div>
      <h2>edit birth year</h2>

      <form onSubmit={submit}>
        <div>
          name{' '}
          <Select
            value={options.find((option) => option.value === name)}
            onChange={(selectedOption) => setName(selectedOption.value)}
            options={options}
          />
        </div>
        <div>
          born{' '}
          <input value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BornForm
