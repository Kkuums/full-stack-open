import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { StyledUser } from './styles/User.styled'

const User = () => {
  const { id } = useParams()
  const users = useSelector((state) => state.users)
  const user = users.find((user) => user.id === id)

  if (!user) {
    return null
  }

  return (
    <StyledUser>
      <h3>{user.username}</h3>
      <h4>added blogs:</h4>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </StyledUser>
  )
}

export default User
