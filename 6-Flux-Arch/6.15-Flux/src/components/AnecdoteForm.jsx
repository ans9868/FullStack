import { createAnecdote } from '../reducers/anecdoteReducer.js'

import { useDispatch } from 'react-redux'
import noteService from '../services/anecdotes.js'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = async (event) => {
        event.preventDefault()
        const message= event.target.message.value
        event.target.message.value = ''
        console.log('newAnecdote', message)
        dispatch(createAnecdote(message))
    }

    return (
        <div>
            <h2>AnecdoteForm</h2>
            <h2>create new</h2>
            <form onSubmit={create}>
                <div><input name="message"/></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm