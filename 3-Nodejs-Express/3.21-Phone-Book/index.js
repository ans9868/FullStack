const express = require('express')
const app = express()
require('dotenv').config()

const Person = require("./models/person")

app.use(express.static('dist')) //not used, tells express to search for static files (images gifs ect.) in the 'dist' or distribution directory

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.path)
    console.log('---')
    next()
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if(error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id'})
    }

    next(error)
}

const cors = require('cors')


app.use(cors())
app.use(express.json())
app.use(requestLogger)

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}


app.get('/', (req, res) => {
    res.send('<h1>The phone book application 3.x</h1>')
})

app.get('/info', (req, res ) => {
    res.send(`<h1>Phonebook has info for ${Person.length} people</h1> <br> <h1>${Date()}</h1>`)
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(person => {
        res.json(person)
    })
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

    const person = new Person ({
        name: body.name,
        number:  body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(note =>{
        if(note) {
            response.json(note)
        } else {
            response.json({error: 'id not found'}) //need to do this through .catch for 3.16
        }
    }).catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id).then(result =>{
        response.status(204).end()
    }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }
    console.log("in index.js before .findByIdAndUpdate")
    Person.findByIdAndUpdate(request.params.id, person, { new: true}).then(
        updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
    console.log("in index.js after .findByIdAndUpdate")
})


app.use(unknownEndpoint)
app.use(errorHandler)

// const PORT = 3002
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
