import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter.jsx'
import AddPersonForm from "./components/AddPersonForm.jsx";
import HandleFilterChange from "./components/HandleFilterChange.jsx";

import personService from "./services/persons"


const App = () => {
    const [persons, setPersons] = useState([])

    useEffect( () => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])



    const [filter, setFilter] = useState('')
    console.log("persons in App.jsx:\n" + persons)
    return (
        <div>
            <h2>Phonebook</h2>
            <HandleFilterChange filter={filter} setFilter={setFilter} />
            <AddPersonForm persons={persons} setPersons={setPersons} />
            <h2>Numbers</h2>
            <Filter persons={persons} setPersons={setPersons} filter={filter} />
        </div>
    )
}
//{persons.map(person => <ul key={person.name}> {person.name} {person.number}</ul>)}
export default App