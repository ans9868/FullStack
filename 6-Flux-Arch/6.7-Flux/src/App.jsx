import { voteAnnecdote, newAnnecdote } from './reducers/anecdoteReducer.js'
import { useSelector, useDispatch } from 'react-redux'


import AnecdoteForm from "./components/AnecdoteForm.jsx";

const App = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAnnecdote(id))
    }


    return (
        <div>
            <h2>Anecdotes</h2>
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
            < AnecdoteForm />
        </div>
    )
}

export default App