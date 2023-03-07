// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardAssessment from 'src/components/molecules/CardAssessment'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import React, { useEffect, useState } from 'react'
import ApiService from '../../lib/api/ApiService'
import { toast } from 'react-hot-toast'

function ListAssessments() {
  // const { assessments } = useSelector((state: RootState) => state.assessments)
  const [assessments, setassessments] = useState([])
  const { FetchAssessments} = ApiService()
  const { error, loading, data } = FetchAssessments()
  useEffect(() => {
    if (data) {
      setassessments(data.assessments)
    }
    if (error) {
      toast.error(error.message)
    }
  }, [data,error])
 

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
