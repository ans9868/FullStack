import { newAnnecdote } from '../reducers/anecdoteReducer.js'
import { useSelector, useDispatch } from 'react-redux'


const AnecdoteForm = () => {
    const dispatch = useDispatch()


    const create = (event) => {
        event.preventDefault()
        const message= event.target.message.value
        event.target.message.value = ''
        console.log('newAnnecddote', message)
        dispatch(newAnnecdote(message))
    }



    return (
        <div>
            <h1>AnecdoteForm</h1>
            <h2>create new</h2>
            <form onSubmit={create}>
                <div><input name="message"/></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm