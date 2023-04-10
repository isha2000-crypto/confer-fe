// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import assessmentsReducer from './assessments/assessmentsSlice'
import rolesReducer from './roles/rolesSlice'
import usersSlice from './users/usersSlice'

export const store = configureStore({
  reducer: {
    assessments: assessmentsReducer,
    roles: rolesReducer,
    users: usersSlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
