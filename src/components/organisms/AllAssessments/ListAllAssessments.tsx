// ** MUI Imports
import Grid from '@mui/material/Grid'

//import { RootState } from 'src/store'
import React, { useEffect, useState } from 'react'

//import ApiService from '../../lib/api/ApiService'
import { useLazyQuery } from '@apollo/client'
import { FETCH_ALL_ASSESSMENTS } from 'src/lib/graphql/Query'
import { useAuth } from 'src/hooks/useAuth'
import Spinner from 'src/@core/components/spinner'
import { useRouter } from 'next/router'
import { Box, Typography, Button } from '@mui/material'
import Icon from 'src/@core/components/icon'
import TableAllAssessments from '@components/molecules/Table/TableAllAssessments'

function ListAllAssessments() {
  const router = useRouter()
  const [allAssessments, setAllAssessments] = useState<any>([])
  const auth = useAuth()
  const [getData, { loading, error }] = useLazyQuery(FETCH_ALL_ASSESSMENTS)

  const handleEmptyClick = () => {
    router.push('/assessments/create')
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData()
      setAllAssessments(result.data.assessments)
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

  if (allAssessments.length == 0) {
    return (
      <Box
        sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column', '& svg': { mb: 2 } }}
      >
        <Icon icon='mdi:pencil-outline' fontSize='2rem' />
        <Typography sx={{ mb: 4, fontWeight: 600 }}>No Assessments Created</Typography>
        <Typography sx={{ mb: 3 }}>
          You have not created any assessments yet. Click on below button to create one.
        </Typography>
        <Button sx={{ mb: 8 }} variant='contained' onClick={handleEmptyClick}>
          Create Assessment
        </Button>
      </Box>
    )
  }

  return (
    <Grid container spacing={6}>
      <TableAllAssessments data={allAssessments} />
    </Grid>
  )
}

export default ListAllAssessments
