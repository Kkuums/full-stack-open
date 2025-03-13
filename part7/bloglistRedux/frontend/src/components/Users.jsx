import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { StyledUsers, CenteredTd } from './styles/Users.Styled'

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <StyledUsers>
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <CenteredTd>{user.blogs.length}</CenteredTd>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledUsers>
  )
}

export default Users
