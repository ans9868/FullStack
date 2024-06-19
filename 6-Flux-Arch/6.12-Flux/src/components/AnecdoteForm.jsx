import { newAnecdote } from '../reducers/anecdoteReducer.js'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault()
        const message= event.target.message.value
        event.target.message.value = ''
        console.log('newAnecdote', message)
        dispatch(newAnecdote(message))
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