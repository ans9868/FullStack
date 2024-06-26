import { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm.jsx";
import AnecdoteList from "./components/AnecdoteList.jsx";
import AnecdoteFilter from "./components/AnecdoteFilter.jsx";
import Notification from "./components/Notification.jsx";

import anecdoteService from './services/anecdotes.js'
import { setAnecdotes } from './reducers/anecdoteReducer.js'
import { useDispatch } from "react-redux";

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        anecdoteService.getAll()
            .then(anecdotes => dispatch(setAnecdotes(anecdotes)))
    }, []) //just runs when application starts

    return (
        <div>
            <h2> Anecdotes </h2>
            < Notification />
            < AnecdoteFilter />
            < AnecdoteList />
            < AnecdoteForm />

        </div>
    )
}

export default App