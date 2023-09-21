import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    logged: false,
    username: undefined,
    id: undefined
  },
  reducers: {
    loginRedux: (state, action) => {
      const {
        status,
        username,
        id
      } = action.payload
      state.logged = status
      state.username = username
      state.id = id
    },
    logoutRedux: (state) => {
      state.logged = false
    }
  }
})

export const { loginRedux, logoutRedux } = loginSlice.actions

export default loginSlice.reducer
