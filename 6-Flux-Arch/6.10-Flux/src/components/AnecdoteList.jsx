import { voteAnecdote } from '../reducers/anecdoteReducer.js'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
    // const anecdotes = useSelector(state => state.anecdotes)
    const anecdotes = useSelector(state => {
        // console.log(state.anecdotes)
        // console.log(state.filter)
        return state.anecdotes.filter(dote => dote.content.includes(state.filter))
    })
    const dispatch = useDispatch()

    const vote = (id) => {
        // console.log('vote button pressed: ', id)
        dispatch(voteAnecdote(id))
    }

    return (
        <div>
            {anecdotes
            .sort((a, b) => b.votes - a.votes)
            .map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList