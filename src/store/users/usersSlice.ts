import { createSlice } from '@reduxjs/toolkit'

export type UsersState = {
  users: any[]
  loading: boolean
  error: string | null
}

// Define the initial state
const initialState: UsersState = {
  loading: false,
  users: [],
  error: null
}

// Define the slice
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersStart(state) {
      state.loading = true
      state.users = []
      state.error = null
    },
    setUsersSuccess(state, action) {
      state.loading = false
      state.users = action.payload
      state.error = null
    },
    setUsersFailure(state, action) {
      state.loading = false
      state.users = []
      state.error = action.payload
    }
  }
})

// Export the slice and its actions
export const { setUsersStart, setUsersSuccess, setUsersFailure } = usersSlice.actions
export default usersSlice.reducer
