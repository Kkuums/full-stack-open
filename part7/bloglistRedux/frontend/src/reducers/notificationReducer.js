import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    color: '',
  },
  reducers: {
    setNotification(state, action) {
      const { message, color } = action.payload
      state.message = message
      state.color = color
    },
    clearNotification(state) {
      state.message = ''
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const setNotificationTimeout = (message, color, seconds) => {
  return (dispatch) => {
    dispatch(setNotification({ message, color }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
