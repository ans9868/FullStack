import {createAnecdote} from "../requests.js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "../NotificationContext.jsx";

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const newAnecdoteMutation =
      useMutation({
          mutationFn: createAnecdote,
          onSuccess: () => {
              queryClient.invalidateQueries( { queryKey: ['anecdotes']})
          }
      })

    const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content: content, votes: 0 })
    console.log('new anecdote')
    //pushing it to notificaiton
    notificationDispatch({ type: "POST_NOTIFICATION", payload: `anecdote '${content} added`})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
