//library 1
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('dist'))

//library 2
var morgan = require('morgan')

app.use(morgan('tiny'))



let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
    res.send('<h1>The phone book application 3.x</h1>')
})

app.get('/info', (req, res ) => {
    res.send(`<h1>Phonebook has info for ${persons.length} people</h1> <br> <h1>${Date()}</h1>`)
})


app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    if (persons.find(person => person.name === body.name )) {
        return response.status(400).json({
            error: 'name already exists'
        })
    }
    if (persons.find(person => person.number === body.number )) {
        return response.status(400).json({
            error: 'number already exists'
        })
    }


    const person = {
        name: body.name,
        number:  body.number,
         id: Math.floor(Math.random()*100000),
    }

    persons = persons.concat(person)

    response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    }else{
        response.status(404).end()
    }

})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})


// const PORT = 3002
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
