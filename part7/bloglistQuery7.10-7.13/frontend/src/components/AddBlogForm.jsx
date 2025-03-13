import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNotificationDispatch } from '../NotificationContext'

import blogService from '../services/blogs'

const AddBlogForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const addBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (blogObject) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(blogObject))

      dispatch({
        type: 'CREATE',
        payload: { title: blogObject.title, author: blogObject.author },
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR' })
      }, 5000)
    },
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    addBlogMutation.mutate({ title, author, url })

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  return (
    <form onSubmit={onCreate}>
      <div>
        Title: <input name='title' />
      </div>
      <div>
        Author: <input name='author' />
      </div>
      <div>
        Url: <input name='url' />
      </div>
      <div>
        <button type='submit'>create</button>
      </div>
    </form>
  )
}

export default AddBlogForm
