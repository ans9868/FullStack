import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter.jsx'
import AddPersonForm from "./components/AddPersonForm.jsx";
import HandleFilterChange from "./components/HandleFilterChange.jsx";

import personService from "./services/persons"


const Notification = ({message}, {positive}) => {
    if (message === null){
        return null
    }
    const className = positive ? 'positiveMessage' : 'negativeMessage';

    return (
        <div className={className}>
            {message}
        </div>
    );

}

const App = () => {
    const [persons, setPersons] = useState([])
    const [message, setMessage] = useState(null)
    const [messageStatus, setMessageStatus] = useState(true)

    useEffect( () => {
        personService
            .getAll()
            .then(initialPersons => {
                console.log("in App.jsx hook personService.getAll ")
                console.log("here are initial people" + initialPersons)
                setPersons(initialPersons)
            })
    }, [])



    const [filter, setFilter] = useState('')
    return (
        <div>
            <Notification message={message} positive={messageStatus} />
            <h2>Phonebook</h2>
            <HandleFilterChange filter={filter} setFilter={setFilter} />
            <AddPersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} setMessageStatus={setMessageStatus}/>
            <h2>Numbers</h2>
            <Filter persons={persons} setPersons={setPersons} filter={filter} />
        </div>
    )
}
//{persons.map(person => <ul key={person.name}> {person.name} {person.number}</ul>)}
export default App