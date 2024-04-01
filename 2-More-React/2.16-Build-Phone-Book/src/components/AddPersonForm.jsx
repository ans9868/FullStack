import React, {useState} from "react"
import personService from "../services/persons"


const AddPersonForm = ({persons, setPersons, setMessage, setMessageStatus }) => {
    const [newPerson, setNewPerson] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const addPerson = (event) => { //add or update person
        event.preventDefault()
        const personName = newPerson
        const personPhone = newNumber

        console.log(`in add person, PersonName: ${personName}`)
        console.log(persons)
        const personExists = (persons.find(person => person.name === personName)) //seems like thi not working !!!!!!!
        console.log(`personExist: ${personExists}`)

        const id = personExists ? personExists.id : 0; //if the personExist the id will be the id of the person that exists, ele it is arbitrary (in this case 0)

        console.log(id)

        const personObj = {
            name:personName,
            number: personPhone,
            id: id
        };


        if (personExists) { //put-ing new person i.e. update the number
            console.log("in the exits clause")
            personService
                .update(personObj)
                .then(updatedNote => {
                    console.log(".update(personObj) complete")
                    setPersons(persons.map(person => person.id !== personObj.id ? person : personObj))
                    setNewPerson('')
                    setNewNumber('')
                    setMessageStatus(true)
                    setMessage(`Updated ${personObj.name}`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
                .catch( error => {
                    setMessageStatus(false)
                    setMessage(`Failed to update ${personObj.name}`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
        }else{ //post-ing new person
            personService
                .create(personObj)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewPerson('')
                    setNewNumber('')
                    setMessageStatus(true)
                    setMessage(`Added ${personObj.name}`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
                .catch( error => {
                    setMessageStatus(false)
                    setMessage(`Failed to add ${personObj.name}`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
        }
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
                name: <input value={newPerson} onChange={handlePersonChange}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={handlePhoneChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
export default AddPersonForm