// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import assessments from 'src/store/assessments'

export const store = configureStore({
  reducer: {
    assessments
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
