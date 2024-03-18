import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }, {name: 'Jacob Stat'}
    ])
    const [newPerson, setNewPerson] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        const personName = newPerson

        const personExists = persons.some(person => person.name === personName)
        if (personExists){
            alert(personName + ` is already added to the phone book`);
            return;
        }
        const personObj = {
            name: personName
        };

        setPersons(persons.concat(personObj))
        setNewPerson("")
    }

    const handlePersonChange = (event) => {
        setNewPerson(event.target.value)
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newPerson} onChange={handlePersonChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map(person => <ul key={person.name}> {person.name} </ul>)}
            </ul>
        </div>
    )
}

export default App