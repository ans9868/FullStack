const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as arg')
    process.exit(1)
}


const password = process.argv[2]


const url = `mongodb+srv://ans9868:${password}@cluster0.idnniv8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema =  new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Persons', personSchema)

if(process.argv[3] === undefined || process.argv[3] === ""){
    console.log("phonebook:")
    Person.find({}).then( result => {
        result.forEach(person => {
            console.log(person.name)
            console.log(person.number)
        })
        mongoose.connection.close()
    })
}else {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}
