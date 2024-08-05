const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'Test',
    author: 'Author Test',
    url: 'www.urltest.test',
    likes: 500,
  },
  {
    title: 'Frontend',
    author: 'Test',
    url: 'www.testfrontend.submit',
    likes: 1000,
  },
  {
    title: 'Refactor',
    author: 'Test',
    url: 'www.refactor.test',
    likes: 1500,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are three blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 3)
})

test('id is named correctly', async () => {
  const response = await api.get('/api/blogs')

  const blogKeys = Object.keys(response.body[0])
  assert.strictEqual(blogKeys.includes('id'), true)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'bloglist_api.test.js blogpost',
    author: 'bloglist_api.test.js',
    url: 'www.bloglist.api',
    likes: 10000,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map((r) => r.title)

  assert.strictEqual(response.body.length, initialBlogs.length + 1)

  assert(titles.includes('bloglist_api.test.js blogpost'))
})

test('blog without likes gets 0 by default', async () => {
  const newBlog = {
    title: 'bloglist_api.test.js blogpost',
    author: 'bloglist_api.test.js',
    url: 'www.bloglist.api',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const lastBlog = response.body.length - 1

  assert.strictEqual(response.body[lastBlog].likes, 0)
})

test('blog without title or url is not added', async () => {
  const newBlog = {
    author: 'No Title',
    likes: 700,
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
})

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

test('blog is deleted if id is valid', async () => {
  const blogsAtStart = await blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await blogsInDb()

  assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1)

  const titles = blogsAtEnd.map((r) => r.title)
  assert(!titles.includes(blogToDelete.title))
})

test('number of likes gets increased', async () => {
  const blogsAtStart = await blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
  await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(201)

  const blogsAtEnd = await blogsInDb()
  const blogAfterUpdate = blogsAtEnd[0]

  assert.strictEqual(blogAfterUpdate.likes, updatedBlog.likes)
})

test('number of likes gets decreased', async () => {
  const blogsAtStart = await blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes - 1 }
  await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(201)

  const blogsAtEnd = await blogsInDb()
  const blogAfterUpdate = blogsAtEnd[0]

  assert.strictEqual(blogAfterUpdate.likes, updatedBlog.likes)
})

after(async () => {
  await mongoose.connection.close()
})
