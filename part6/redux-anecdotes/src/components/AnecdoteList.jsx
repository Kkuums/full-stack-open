import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer'
import AnecdoteFilter from './AnecdoteFilter'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )

  const handleVote = (anecdote) => {
    dispatch(addVote(anecdote.id))
    dispatch(setNotification(`Vote added to "${anecdote.content}"`))

    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteFilter />
      {filteredAnecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
