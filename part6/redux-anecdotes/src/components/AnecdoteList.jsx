import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotificationTimeout } from '../reducers/notificationReducer'
import AnecdoteFilter from './AnecdoteFilter'
import anecdoteService from '../services/anecdotes'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )

  const handleVote = async (anecdote) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    const changedAnecdote = await anecdoteService.update(
      anecdote.id,
      updatedAnecdote
    )
    dispatch(addVote(changedAnecdote.id))

    dispatch(setNotificationTimeout(`Vote added to "${anecdote.content}"`, 5))
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
