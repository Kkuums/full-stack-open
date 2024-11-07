import { useSelector } from 'react-redux'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
  const notification = useSelector((state) => state.notification)

  return (
    <div>
      {notification && <Notification />}
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
