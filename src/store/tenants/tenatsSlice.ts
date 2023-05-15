import { createSlice } from '@reduxjs/toolkit'

export type TenantsState = {
  tenants: any[]
  loading: boolean
  error: string | null
}

// Define the initial state
const initialState: TenantsState = {
  loading: false,
  tenants: [],
  error: null
}

// Define the slice
const tenantsSlice = createSlice({
  name: 'tenants',
  initialState,
  reducers: {
    setTenantsStart(state) {
      ;(state.loading = true), (state.error = null)
    },
    setTenantsSuccess(state, action) {
      state.loading = false
      state.tenants = action.payload
      state.error = null
    },
    setTenantsFailure(state, action) {
      state.loading = false
      state.error = action.payload
    }
  }
})

// Export the slice and its actions
export const { setTenantsFailure, setTenantsStart, setTenantsSuccess } = tenantsSlice.actions
export default tenantsSlice.reducer
