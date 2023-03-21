import { createSlice } from '@reduxjs/toolkit'
import { client } from '../../lib/apollo/client'
import { Assessment } from '@custom-types/assessmentsType'
import { LOAD_AVAILABLE_ASSESSMENTS } from 'src/lib/graphql/Query'

export type AssessmentsState = {
  assessments: Assessment[]
  loading: boolean
  error: string | null
}

// Define the initial state
const initialState: AssessmentsState = {
  loading: false,
  assessments: [],
  error: null
}

// Define the slice
const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {
    getAssessmentsStart(state) {
      state.loading = true
      state.assessments = []
      state.error = null
    },
    getAssessmentsSuccess(state, action) {
      state.loading = false
      state.assessments = action.payload
      state.error = null
    },
    getAssessmentsFailure(state, action) {
      state.loading = false
      state.assessments = []
      state.error = action.payload
    }
  }
})

// Define an async thunk to fetch the user data
export const fetchAssessments = () => async (dispatch: (arg0: { payload: any; type: string }) => void) => {
  dispatch(getAssessmentsStart())
  try {
    const { data } = await client.query({
      query: LOAD_AVAILABLE_ASSESSMENTS
    })

    dispatch(getAssessmentsSuccess(data.availableAssessments))
  } catch (error: any) {
    dispatch(getAssessmentsFailure(error.message))
  }
}

// Export the slice and its actions
export const { getAssessmentsStart, getAssessmentsSuccess, getAssessmentsFailure } = assessmentSlice.actions
export default assessmentSlice.reducer
