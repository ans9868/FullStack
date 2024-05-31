import { voteAnnecdote, newAnnecdote } from './reducers/anecdoteReducer.js'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAnnecdote(id))
    }

    const create = (event) => {
        event.preventDefault()
        const message= event.target.message.value
        event.target.message.value = ''
        console.log('newAnnecddote', message)
        dispatch(newAnnecdote(message))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
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
            <h2>create new</h2>
            <form onSubmit={create}>
                <div><input name="message" /></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default App