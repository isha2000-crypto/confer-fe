import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Assessment } from '@custom-types/assessmentsType'
import { FetchAssessments } from '../../lib/api/ApiAssessments'

export type AssessmentsState = {
  assessments: Assessment[]
  status: 'idle' | 'loading' | 'failed'
  error: string | null
}

const initialState: AssessmentsState = {
  assessments: [],
  status: 'idle',
  error: null
}

export const fetchAssessments = createAsyncThunk('assessments/FetchAssessments', async () => {
  const response = await FetchAssessments()
  console.log('here i am the response ', response.data)

  //return response.data
})

const assessmentsSlice = createSlice({
  name: 'assessments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAssessments.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchAssessments.fulfilled, (state, action) => {
        state.status = 'idle'
        state.assessments = action.payload
      })
      .addCase(fetchAssessments.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Something went wrong'
      })
  }
})

export default assessmentsSlice.reducer
