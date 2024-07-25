const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://kristianskums:${password}@phonebookexercises.p04nliz.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=phonebookExercises`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', phonebookSchema)

if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then((result) => {
    console.log(result)
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
