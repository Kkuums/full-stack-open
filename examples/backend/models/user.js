const mongoose = require('mongoose')

const usernameRegex = /^[a-zA-Z0-9_]+$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // this ensures the uniqueness of username
    minLength: 4,
    match: usernameRegex,
  },
  name: String,
  passwordHash: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return passwordRegex.test(v)
      },
    },
  },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note',
    },
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
