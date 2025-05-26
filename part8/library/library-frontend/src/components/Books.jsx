import { useQuery, useSubscription, useApolloClient } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'
import { useState } from 'react'

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState('')

  const client = useApolloClient()

  const books = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
    fetchPolicy: 'network-only',
  })

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded

      if (selectedGenre && !addedBook.genres.includes(selectedGenre)) {
        return
      }

      alert(`New book added: ${addedBook.title} by ${addedBook.author.name}`)

      client.cache.updateQuery(
        { query: ALL_BOOKS, variables: { genre: selectedGenre || null } },
        ({ allBooks }) => {
          if (allBooks.find((b) => b.id === addedBook.id)) {
            return { allBooks }
          }
          return {
            allBooks: allBooks.concat(addedBook),
          }
        }
      )
    },
  })

  if (!props.show) return null
  if (books.loading) return <div>loading...</div>

  const genres = ['fiction', 'satire', 'science-fiction', 'dystopia']

  return (
    <div>
      <h2>books</h2>

      {selectedGenre && (
        <p>
          in genre <strong>{selectedGenre}</strong>
        </p>
      )}

      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books.data.allBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setSelectedGenre('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
