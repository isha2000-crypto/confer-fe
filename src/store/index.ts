// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
//import assessments from 'src/store/assessments'
import assessmentsReducer from './assessments/ assessmentsSlice'

//import { useDispatch } from 'react-redux'
//import { fetchAssessments } from './assessments/ assessmentsSlice'

export const store = configureStore({
  reducer: {
    assessments: assessmentsReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

// Fetch assessments data on app load
//store.dispatch(fetchAssessments())
