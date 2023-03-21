// ** MUI Imports
import Grid from '@mui/material/Grid'

//import { RootState } from 'src/store'
import React, { useEffect, useState } from 'react'

//import ApiService from '../../lib/api/ApiService'
import { useLazyQuery } from '@apollo/client'
import { SUBMITTED_ASSESSMENTS_USER } from 'src/lib/graphql/Query'
import { useAuth } from 'src/hooks/useAuth'
import CardSubmittedAssessment from '@components/molecules/CardSubmittedAssessment'
import Spinner from 'src/@core/components/spinner'

function ListSubmittedAssessments() {
  const [submittedAssessments, setSubmittedAssessments] = useState<any>([])
  const auth = useAuth()
  const [getData, { loading, error }] = useLazyQuery(SUBMITTED_ASSESSMENTS_USER, {
    variables: { submittedAssessmentsUserId: auth.user?.id }
  })

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData({
        variables: { submittedAssessmentsUserId: auth.user?.id }
      })
      setSubmittedAssessments(result.data.submittedAssessmentsUser)
    }
    if (!auth.loading && auth.user) {
      fetchData()
    }
  }, [auth, getData])

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <div>Error</div>
  }

  if (submittedAssessments.length == 0) {
    return <div>You have not submitted any assessments.</div>
  }

  return (
    <Grid container spacing={6}>
      {submittedAssessments.map((item: any, index: number) => {
        return (
          <Grid key={index} item xs={12} md={6} lg={4}>
            <CardSubmittedAssessment {...item} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default ListSubmittedAssessments
