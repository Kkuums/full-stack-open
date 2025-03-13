import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    addComment(state, action) {
      const { id, comment } = action.payload
      const blog = state.find((blog) => blog.id === id)
      if (blog) {
        blog.comments = blog.comments ? [...blog.comments, comment] : [comment]
      }
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, removeBlog, addComment } =
  blogSlice.actions

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll()
  dispatch(setBlogs(blogs))
}

export const createBlog = (newObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(newObject)
    dispatch(appendBlog(newBlog))
  }
}

export const addLike = (id) => {
  return async (dispatch, getState) => {
    const state = getState().blogs
    const blogToChange = state.find((b) => b.id === id)
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1,
    }
    const updatedBlog = await blogService.update(id, changedBlog)
    dispatch(updateBlog(updatedBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(removeBlog(id))
  }
}

export const createComment = (id, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment(id, comment)
    dispatch(addComment({ id, comment }))
  }
}

export default blogSlice.reducer
