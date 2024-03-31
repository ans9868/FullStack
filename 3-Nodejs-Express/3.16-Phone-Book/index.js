const express = require('express')
const app = express()
require('dotenv').config()

const Person = require("./models/person")

app.use(express.static('dist')) //not used, tells express to search for static files (images gifs ect.) in teh 'dist' or distribution directory

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

    //not sure if Person.find works for finding if name / number already in Person
    // if (Person.find(person => person.name === body.name )) {
    //     return response.status(400).json({
    //         error: 'name already exists'
    //     })
    // }
    // if (Person.find(person => person.number === body.number )) {
    //     return response.status(400).json({
    //         error: 'number already exists'
    //     })
    // }

    const person = new Person ({
        name: body.name,
        number:  body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

//3.18  is done here! did it in 3.15 on accident (oopsies)
app.get('/api/persons/:id', (request, response, next) => {
    const id = Number(request.params.id)
    Person.findById(id).then(note =>{
        if(note) {
            response.json(note)
        } else {
            response.json({error: 'id not found'}) //need to do this through .catch for 3.16
        }
    }).catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
    const id = Number(request.params.id)
    Person.findByIdAndDelete(id).then(result =>{
        response.status(204).end()
    }).catch(error => next(error))
})

//put goes here

app.use(unknownEndpoint)
app.use(errorHandler)

// const PORT = 3002
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
