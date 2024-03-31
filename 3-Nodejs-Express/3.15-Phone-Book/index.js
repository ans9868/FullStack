const express = require('express')
const app = express()
require('dotenv').config()

const Person = require("./models/person")

app.use(express.static('dist')) //not used, tells express to search for static files (images gifs ect.) in teh 'dist' ordistribution directory

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.path)
    console.log('---')
    next()
}

//put errorHandler here for 3.16

const cors = require('cors')


app.use(cors())
app.use(express.json())
app.use(requestLogger)


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
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    Person.findById(id).then(note =>{
        if(note) {
            response.json(note)
        } else {
            response.json({error: 'id not found'}) //need to do this through .catch for 3.16
        }
    })
})


app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    Person.findByIdAndDelete(request.params.id).then(aResult =>{
        response.status(204).end()
    }) //add catch there 3.16
})

//put goes here

// const PORT = 3002
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
