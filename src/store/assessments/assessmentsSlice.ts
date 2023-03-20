// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { Assessment } from '@custom-types/assessmentsType'
// import { FetchAssessments } from '../../lib/api/ApiAssessments'

// const initialState: AssessmentsState = {
//   assessments: [],
//   status: 'idle',
//   error: null
// }

// export const fetchAssessments = createAsyncThunk('assessments/FetchAssessments', async () => {
//   const response = await FetchAssessments()
//   console.log('here i am the response ', response.data)

//   //return response.data
// })

// const assessmentsSlice = createSlice({
//   name: 'assessments',
//   initialState,
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(fetchAssessments.pending, state => {
//         state.status = 'loading'
//       })
//       .addCase(fetchAssessments.fulfilled, (state, action) => {
//         state.status = 'idle'
//         state.assessments = action.payload
//       })
//       .addCase(fetchAssessments.rejected, (state, action) => {
//         state.status = 'failed'
//         state.error = action.error.message ?? 'Something went wrong'
//       })
//   }
// })

// export default assessmentsSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { gql } from '@apollo/client'
import { client } from '../../lib/apollo/client'
import { Assessment } from '@custom-types/assessmentsType'

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

// Define the GraphQL query
export const LOAD_ASSESSMENT = gql`
  query Assessments {
    assessments {
      author {
        name
      }
      authorId
      description
      _id
      title
      type
      tasks {
        description
        duration
        _id
      }
    }
  }
`

// Define the slice
const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {
    getAssessmentsStart(state) {
      state.loading = false
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

// store,slice,reducer,selector,action i this file action in separate file , onclick functionality on assessment card add button start assessment
// wehn assessment start /recoder/assessment/id

// Define an async thunk to fetch the user data
export const fetchAssessments = () => async (dispatch: (arg0: { payload: any; type: string }) => void) => {
  dispatch(getAssessmentsStart())
  try {
    const { data } = await client.query({
      query: LOAD_ASSESSMENT
    })

    dispatch(getAssessmentsSuccess(data.assessments))
  } catch (error) {
    dispatch(getAssessmentsFailure(error.message))
  }
}

// Export the slice and its actions
export const { getAssessmentsStart, getAssessmentsSuccess, getAssessmentsFailure } = assessmentSlice.actions
export default assessmentSlice.reducer
