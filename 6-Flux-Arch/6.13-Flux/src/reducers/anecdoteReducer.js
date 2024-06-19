import { createSlice, current } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: initialState,
  reducers:{
    voteAnecdote(state, action){
      // console.log('voted')
      // console.log(current(state))
      const id = action.payload
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    },
    newAnecdote(state, action){
      // console.log('new anecdote')
      state.push(asObject(action.payload))
    }
  }
})

//6.11 right here I think

export const  { voteAnecdote, newAnecdote } = anecdoteSlice.actions

export default anecdoteSlice.reducer

/*
const reducer = (state = initialState, action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  switch (action.type){
    case "VOTE_ANECDOTE":
      const id = action.payload.id
      return state.map( anecdote =>
          anecdote.id !== id ?
              anecdote :
              {...anecdote, votes: anecdote.votes + 1})
    case "ADD_ANECDOTE":
      return [...state, action.payload]
    default:
      return state
  }
}

export const newAnecdote = (message) => {
  return {
    type: "ADD_ANECDOTE",
    payload: {
      content: message,
      id: getId(),
      votes: 0
    }
  }
}

export const voteAnecdote = (id) =>  {
  return {
    type: "VOTE_ANECDOTE",
    payload: { id }
  }
}

export default reducer

 */