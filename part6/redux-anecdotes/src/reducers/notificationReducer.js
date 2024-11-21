import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
  },
  reducers: {
    setNotification(state, action) {
      const { message } = action.payload
      state.message = message
    },
    clearNotification(state) {
      state.message = ''
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const setNotificationTimeout = (message, seconds) => {
  return (dispatch) => {
    dispatch(setNotification({ message }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
