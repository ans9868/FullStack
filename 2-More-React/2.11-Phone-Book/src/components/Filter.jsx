import React from "react"

const Filter = ({persons, filter }) => {
    const personsToShow = filter.length === 0
        ? persons
        : persons.filter(person => person.name.slice(0,filter.length).toLowerCase() === filter.toLowerCase())

    return (
        <ul>
            {personsToShow.map(person => <ul key={person.name}> {person.name} {person.number}</ul>)}
        </ul>

    )
}

export default Filter