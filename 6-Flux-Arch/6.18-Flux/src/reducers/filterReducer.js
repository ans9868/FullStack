import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers:{
        setFilter(state, action) {
            console.log('new filter: ' + action.payload)
            return action.payload
        }
    }
})

export const { setFilter } = filterSlice.actions

export default filterSlice.reducer

/*
const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            console.log('new filter' + action.payload)
            return action.payload
        default:
            return state
    }
}

export const editFilter = (filter) => {
   return {
       type: "SET_FILTER",
       payload:  filter
   }
}

export default filterReducer
 */