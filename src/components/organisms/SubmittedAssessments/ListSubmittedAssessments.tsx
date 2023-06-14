// ** MUI Imports

//import { RootState } from 'src/store'
import React, { useEffect, useState } from 'react'

//import ApiService from '../../lib/api/ApiService'
import { useLazyQuery } from '@apollo/client'
import { LIST_SUBMITTED_ASSESSMENTS } from 'src/lib/graphql/Query'
import { useAuth } from 'src/hooks/useAuth'
import Spinner from 'src/@core/components/spinner'
import { useRouter } from 'next/router'
import { Box, Typography, Button } from '@mui/material'
import Icon from 'src/@core/components/icon'
import TableSubmittedAssessments from '@components/molecules/Table/TableSubmittedAssessment'

function ListSubmittedAssessments() {
  const router = useRouter()
  const [submittedAssessments, setSubmittedAssessments] = useState<any>([])
  const auth = useAuth()
  const [getData, { loading, error }] = useLazyQuery(LIST_SUBMITTED_ASSESSMENTS)

  const handleEmptyClick = () => {
    router.push('/assessments/available')
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData()
      setSubmittedAssessments(result.data.submittedAssessments)
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
    return (
      <Box
        sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column', '& svg': { mb: 2 } }}
      >
        <Icon icon='mdi:pencil-outline' fontSize='2rem' />
        <Typography sx={{ mb: 4, fontWeight: 600 }}>No Assessments Submitted</Typography>
        <Typography sx={{ mb: 3 }}>
          You have not submitted any assessments yet, Please click on below button to view available assessments.
        </Typography>
        <Button sx={{ mb: 8 }} variant='contained' onClick={handleEmptyClick}>
          Available Assessments
        </Button>
      </Box>
    )
  }

  return <TableSubmittedAssessments data={submittedAssessments} />
}

export default ListSubmittedAssessments
