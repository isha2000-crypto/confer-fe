// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

const assessments: any = [
  {
    type: 'leadership',
    title: 'Leading a Team',
    time: '15m',
    responses: '21',
    tasks: '5',
    author: 'Husnain'
  },
  {
    type: 'coding',
    title: 'Mern Application',
    time: '15m',
    responses: '21',
    tasks: '5',
    author: 'Husnain'
  },
  {
    type: 'coding',
    title: 'Node Application',
    time: '15m',
    responses: '21',
    tasks: '5',
    author: 'Husnain'
  },
  {
    type: 'coding',
    title: 'Nextjs Application',
    time: '15m',
    responses: '21',
    tasks: '5',
    author: 'Husnain'
  },
  {
    type: 'coding',
    title: 'Heroku Deployment',
    time: '15m',
    responses: '21',
    tasks: '5',
    author: 'Husnain'
  },
  {
    type: 'leadership',
    title: 'Distributing tasks in team',
    time: '15m',
    responses: '21',
    tasks: '5',
    author: 'Husnain'
  }
]

export const assessmentsSlice = createSlice({
  name: 'appPermissions',
  initialState: {
    assessments: [...assessments]
  },
  reducers: {}
})

export default assessmentsSlice.reducer
