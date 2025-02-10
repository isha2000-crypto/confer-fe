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

// hey its khalida Abbas here!
// I have been working as a senior software engineer from past 6 years.
// my main tech stacks are React ,node js ,nest and next and a lil bot of aws and due to enthusiasm i explore alot of new tech stack like few months back i have started to explore devops
// but mainly anything that is associated wth javascript is of type you can say me as a js girl
// if i give you a throyghback to my tech career right from the start in 2017 i started to work in a startup in which my i started my career as a front end developer i worked alot in react but after sometime if fpund my interset in backened as well so i started to work as a full stack engineer
// after one year i joined another company because i wanted more challenging environment to uplift my technical,management,leadershif and diverse skills
// but unfortunatley corona hit and things got lil bit upset so i joined letsremotify and now i am working on a interview process management project
// and now i am leading a team of 17 + more engineers i work with diverse teams like ui team ,testing team and mamagemnet
// if i tell my day to day routine besides of these i love testing i write alot of test cases and reviewing PRs is my one of the most favouritetasks
//
