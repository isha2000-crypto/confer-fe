import { createSlice } from '@reduxjs/toolkit'

export type RolesState = {
  roles: any[]
  loading: boolean
  error: string | null
  updateLoading: boolean
  updateError: string | null
}

// Define the initial state
const initialState: RolesState = {
  loading: false,
  roles: [],
  error: null,
  updateLoading: false,
  updateError: null
}

// Define the slice
const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setRolesStart(state) {
      ;(state.loading = true), (state.error = null)
    },
    setRolesSuccess(state, action) {
      state.loading = false
      state.roles = action.payload
      state.error = null
    },
    setRolesFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    setRoleUpdateStart(state) {
      state.updateLoading = true
      state.updateError = null
    },
    setRoleUpdateFailure(state, action) {
      state.updateLoading = false
      state.updateError = action.payload
    },
    setRoleUpdateSuccess(state, action) {
      state.updateLoading = false
      state.roles = state.roles.map(role => (role._id === action.payload._id ? action.payload : role))
    }
  }
})

// Export the slice and its actions
export const {
  setRolesStart,
  setRolesSuccess,
  setRolesFailure,
  setRoleUpdateSuccess,
  setRoleUpdateStart,
  setRoleUpdateFailure
} = rolesSlice.actions
export default rolesSlice.reducer
