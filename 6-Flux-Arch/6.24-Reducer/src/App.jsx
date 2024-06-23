import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import axios from 'axios'

import {getAnecdotes, updateAnecdote} from "./requests.js";

import { useNotificationDispatch } from "./NotificationContext.jsx";


const App = () => {

  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()


  const voteAnecdoteMutation =
      useMutation({
          mutationFn: updateAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        }
  })


  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    console.log('vote')
      notificationDispatch({ type: "POST_NOTIFICATION", payload: `voted for: ${anecdote.content}`})
  }


  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading){
    return <div>loading data ...</div>
  }

  if (result.isError ){
    return (
        <div>
          <p>anecdote service not available due to a problem in the server</p>
        </div>
    )
  }

  const anecdotes = result.data
  console.log(anecdotes)

  return (

    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
