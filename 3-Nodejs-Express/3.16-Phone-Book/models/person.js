const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

const url = (process.env.MONGODB_URI)


//console.log(`MONGODV_URI: ${url}`)

console.log('connecting to url')
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

mongoose.set('strictQuery', false)

personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Persons', personSchema)
// ** for testing and debugging
// const Person = mongoose.model('Persons', personSchema)
//
// Person.find({}).then( result => {
//     result.forEach(person => {
//         console.log(person.name)
//         console.log(person.number)
//     })
//     mongoose.connection.close()
// })

