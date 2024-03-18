import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter.jsx'
import AddPersonForm from "./components/AddPersonForm.jsx";
import HandleFilterChange from "./components/HandleFilterChange.jsx";

const App = () => {
    const [persons, setPersons] = useState([])

    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])

    const [filter, setFilter] = useState('')
    //const personsToShow = filter.length === 0 ? persons : persons.filter(person => person.name.slice(0,filter.length).toLowerCase() === filter.toLowerCase())
    console.log(filter.length)
    console.log("Filter:" + filter)
    //console.log("Person:" + persons[0].name.slice(0,filter.length))
    return (
        <div>
            <h2>Phonebook</h2>
            <HandleFilterChange filter={filter} setFilter={setFilter} />
            <AddPersonForm persons={persons} setPersons={setPersons} />
            <h2>Numbers</h2>
            <Filter persons={persons} filter={filter} />
        </div>
    )
}
//{persons.map(person => <ul key={person.name}> {person.name} {person.number}</ul>)}
export default App