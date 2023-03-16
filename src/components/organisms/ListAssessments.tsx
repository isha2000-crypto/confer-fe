// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardAssessment from 'src/components/molecules/CardAssessment'

//import { RootState } from 'src/store'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAssessments, AssessmentsState } from '../../store/assessments/ assessmentsSlice'

//import ApiService from '../../lib/api/ApiService'
import { toast } from 'react-hot-toast'

function ListAssessments() {
  // const { assessments } = useSelector((state: RootState) => state.assessments)
  // const [assessments, setassessments] = useState([])
  // const { FetchAssessments } = ApiService()
  // const { error, loading, data } = FetchAssessments()
  const dispatch = useDispatch()
  const { assessments, status, error } = useSelector((state: { assessments: AssessmentsState }) => state.assessments)

  // useEffect(() => {
  //   if (data) {
  //     console.log('Assessments data:', data)

  //     setassessments(data.assessments)
  //   }
  //   if (error) {
  //     toast.error(error.message)
  //   }
  // }, [data, error])

  useEffect(() => {
    dispatch(fetchAssessments)
  }, [dispatch])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'failed') {
    return <div>{error}</div>
  }
  console.log('Assessments state:', assessments)

  return (
    <>
      {assessments.map((item: any, index: number) => {
        return (
          <Grid key={index} item xs={12} md={6} lg={4}>
            <CardAssessment {...item} />
          </Grid>
        )
      })}
    </>
  )
}

export default ListAssessments
