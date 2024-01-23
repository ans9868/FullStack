import React, {useState} from "react"
const AddPersonForm = ({persons, setPersons }) => {
    const [newPerson, setNewPerson] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        const personName = newPerson
        const personPhone = newNumber


        const personExists = persons.some(person => person.name === personName)
        const phoneExists = persons.some(person => person.number === personPhone)

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
        setNewNumber(event.target.value)
    }

    return (
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
    )
}
export default AddPersonForm