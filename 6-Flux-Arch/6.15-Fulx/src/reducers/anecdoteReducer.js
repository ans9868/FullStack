import { createSlice, current } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
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
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

//6.11 right here I think

export const  { voteAnecdote, newAnecdote, setAnecdotes } = anecdoteSlice.actions

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