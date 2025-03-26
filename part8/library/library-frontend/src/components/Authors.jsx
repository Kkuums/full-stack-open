import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from './queries'
import BornForm from './BornForm'

const Authors = (props) => {
  if (!props.show) {
    return null
  }
  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  })

  if (authors.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <BornForm />
    </div>
  )
}

export default Authors
