import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '22' }, {name: 'Jacob Stat', number: '33'}
    ])
    const [newPerson, setNewPerson] = useState('')
    const [newPhone, setNewPhone] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        const personName = newPerson
        const personPhone = newPhone


        const personExists = persons.some(person => person.name === personName)
        const phoneExists = persons.some(person => person.phone === personPhone)

        if (personExists || phoneExists){
            alert(personName + ' is already added to the phone book')
            //alert(personName + ` or ` +  ` is already added to the phone book`);
            return;
        }
        const personObj = {
            name:personName,
            number: personPhone
        };

        setPersons(persons.concat(personObj))
        setNewPerson("")
    }

    const handlePersonChange = (event) => {
        setNewPerson(event.target.value)
    }
    const handlePhoneChange = (event) => {
        setNewPhone(event.target.value)
    }



    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input onChange={handlePersonChange}/>
                </div>
                <div>
                    number: <input onChange={handlePhoneChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map(person => <ul key={person.name}> {person.name} {person.number}</ul>)}
            </ul>
        </div>
    )
}

export default App