// ** Redux Imports
import { Assessment } from '@custom-types/assessmentsType'
import { createSlice } from '@reduxjs/toolkit'

const assessments: Assessment[] = [
  {
    id: '1',
    type: 'leadership',
    title: 'Leading a Team',
    time: '15m',
    responses: '21',
    tasks: '5',
    author: 'Husnain'
  },
  {
    id: '2',
    type: 'coding',
    title: 'Mern Application',
    time: '15m',
    responses: '21',
    tasks: '5',
    author: 'Husnain'
  },
  {
    id: '3',
    type: 'coding',
    title: 'Node Application',
    time: '15m',
    responses: '21',
    tasks: '5',
    author: 'Husnain'
  },
  {
    id: '4',
    type: 'coding',
    title: 'Nextjs Application',
    time: '15m',
    responses: '21',
    tasks: '5',
    author: 'Husnain'
  },
  {
    id: '5',
    type: 'coding',
    title: 'Heroku Deployment',
    time: '15m',
    responses: '21',
    tasks: '5',
    author: 'Husnain'
  },
  {
    id: '6',
    type: 'leadership',
    title: 'Distributing tasks in team',
    time: '15m',
    responses: '21',
    tasks: '5',
    author: 'Husnain'
  }
]

export const assessmentsSlice = createSlice({
  name: 'assessments',
  initialState: {
    assessments
  },
  reducers: {}
})

export default assessmentsSlice.reducer
