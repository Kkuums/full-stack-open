import { render, screen } from '@testing-library/react'
import AddBlogForm from './AddBlogForm'
import userEvent from '@testing-library/user-event'

test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<AddBlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('title')
  const inputAuthor = screen.getByPlaceholderText('author')
  const inputUrl = screen.getByPlaceholderText('url')
  const createButton = screen.getByText('create')

  await user.type(inputTitle, 'testing a form')
  await user.type(inputAuthor, 'react testing library')
  await user.type(inputUrl, 'www.reacttestinglibrary.com')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0].title).toBe('testing a form')
  expect(createBlog.mock.calls[0][0].author).toBe('react testing library')
  expect(createBlog.mock.calls[0][0].url).toBe('www.reacttestinglibrary.com')
})
