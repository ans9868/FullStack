import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newPerson, setNewPerson] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        const personName = newPerson
        const personPhone = newNumber


        const personExists = persons.some(person => person.name === personName)
        const phoneExists = persons.some(person => person.number === personPhone)

        if (personExists || phoneExists){
            alert(personName + ' is already added to the phone book')
            return;
        }
        const personObj = {
            name:personName,
            number: personPhone
        };

        setPersons(persons.concat(personObj))
        setNewPerson("")
        setNewNumber("")
    }

    const handlePersonChange = (event) => {
        setNewPerson(event.target.value)
    }
    const handlePhoneChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const personsToShow = filter.length === 0 ? persons : persons.filter(person => person.name.slice(0,filter.length).toLowerCase() === filter.toLowerCase())
    //const personsToShow = 0 === 1 ? persons : persons.filter(person => person.name[0] === "A")
    console.log(filter.length)
    console.log("Filter:" + filter)
    console.log("Person:" + persons[0].name.slice(0,filter.length))
    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    filter shown with <input onChange={handleFilterChange}/>
                </div>
            </form>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newPerson} onChange={handlePersonChange}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={handlePhoneChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {personsToShow.map(person => <ul key={person.name}> {person.name} {person.number}</ul>)}
            </ul>
        </div>
    )
}
//{persons.map(person => <ul key={person.name}> {person.name} {person.number}</ul>)}
export default App