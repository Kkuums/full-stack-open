import { useQuery } from '@apollo/client'
import { ALL_BOOKS, CURRENT_USER } from './queries'

const Recommendations = ({ show }) => {
  const currentUser = useQuery(CURRENT_USER)

  const favoriteGenre = currentUser.data?.me?.favoriteGenre

  const books = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
  })

  if (currentUser.laoding || books.loading) return <div>Loading...</div>

  if (!show) return null

  return (
    <div>
      <h2>Recommendations</h2>

      <p>
        books in your favorite genre: <strong>{favoriteGenre}</strong>
      </p>

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
    </div>
  )
}

export default Recommendations
