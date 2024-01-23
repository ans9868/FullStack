import { useState } from 'react'

import Filter from './components/Filter.jsx'
import AddPersonForm from "./components/AddPersonForm.jsx";
import HandleFilterChange from "./components/HandleFilterChange.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])

    const [filter, setFilter] = useState('')



    //const personsToShow = filter.length === 0 ? persons : persons.filter(person => person.name.slice(0,filter.length).toLowerCase() === filter.toLowerCase())
    console.log(filter.length)
    console.log("Filter:" + filter)
    console.log("Person:" + persons[0].name.slice(0,filter.length))
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