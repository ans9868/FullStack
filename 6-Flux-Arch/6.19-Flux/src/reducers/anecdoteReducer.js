import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

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
      const anecdoteToChange = action.payload
      const changedAnecdote = {
        ...anecdoteToChange,
      }
      return state.map(anecdote => anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote)
    },
    appendAnecdote(state, action){
      // console.log('new anecdote')
      // state.push(asObject(action.payload))
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

//6.11 right here I think

export const  { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch(setAnecdotes(notes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const registerVote = (id) => {
  return async dispatch =>{
    const registerVote = await anecdoteService.vote(id)
    dispatch(voteAnecdote(registerVote))
  }
}

export default anecdoteSlice.reducer