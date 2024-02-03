import React from "react"
import personServices from '../services/persons'


const Filter = ({persons, filter, setPersons }) => {
    const personsToShow = filter.length === 0
        ? persons
        : persons.filter(person => person.name.slice(0,filter.length).toLowerCase() === filter.toLowerCase())

    const onDelete = (id) => {
        console.log(id)
        personServices.onDelete(id)
            .then( () => {

                setPersons(prevPersons => prevPersons.filter(person => person.id !== id))
            })
            .catch(error => {
                console.error("error deleting person:", error)
            })
    }

    return (
        <ul>
            {personsToShow.map(person =>
                <ul key={person.name}>
                    {person.name} {person.number}
                    <button onClick={() => onDelete(person.id)}>Delete</button>
                </ul>
            )}
        </ul>
    )
}

export default Filter