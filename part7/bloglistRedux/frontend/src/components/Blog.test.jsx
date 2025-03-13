import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders only title and author by default', () => {
  const blog = {
    title: 'Component testing',
    author: 'React testing library',
    url: 'www.reacttestinglibrary.com',
    likes: 5,
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Component testing')
  expect(div).toHaveTextContent('React testing library')

  expect(div).not.toHaveTextContent('www.reacttestinglibrary.com')
  expect(div).not.toHaveTextContent('likes 5')
})

test('renders url and likes when show details button is clicked', async () => {
  const blog = {
    title: 'Component testing',
    author: 'React testing library',
    url: 'www.reacttestinglibrary.com',
    likes: 5,
    user: { username: 'testuser' },
  }

  const user = {
    username: 'testuser',
  }

  const { container } = render(<Blog blog={blog} user={user} />)

  const userEventSetup = userEvent.setup()
  const button = screen.getByText('view')
  await userEventSetup.click(button)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('www.reacttestinglibrary.com')
  expect(div).toHaveTextContent('likes 5')
})

test('clicking the like button twice calls the event handler twice', async () => {
  const blog = {
    title: 'Component testing',
    author: 'React testing library',
    url: 'www.reacttestinglibrary.com',
    likes: 5,
    user: { username: 'testuser' },
  }

  const user = {
    username: 'testuser',
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} user={user} handleBlogLike={mockHandler} />)

  const userView = userEvent.setup()
  const buttonView = screen.getByText('view')
  await userView.click(buttonView)

  const userLike = userEvent.setup()
  const buttonLike = screen.getByText('like')
  await userLike.click(buttonLike)
  await userLike.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
