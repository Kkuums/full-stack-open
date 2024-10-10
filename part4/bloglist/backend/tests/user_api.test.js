const { test, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'bloglist_user',
      name: 'Blog List',
      password: 'strongpassword',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    assert(usernames.includes(newUser.username))
  })
})

describe('when the username or password is too short', () => {
  test('username with less than 3 characters is not added', async () => {
    const newUser = {
      username: 'to',
      name: 'Too Short',
      password: 'notadded',
    }

    await api.post('/api/users').send(newUser).expect(400).expect({
      error:
        'User validation failed: username: Path `username` (`to`) is shorter than the minimum allowed length (3).',
    })
  })

  test('password with less than 3 characters is not added', async () => {
    const newUser = {
      username: 'Tooshort',
      name: 'Password',
      password: 'to',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect({ error: 'password should be at least 3 characters long' })
  })
})
