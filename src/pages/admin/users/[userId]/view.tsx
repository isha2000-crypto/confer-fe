import React from 'react'

// ** MUI Imports
import { useRouter } from 'next/router'
import { useLazyQuery } from '@apollo/client'
import { FETCH_USER_BY_ID } from 'src/lib/graphql/Query'
import Spinner from 'src/@core/components/spinner'
import { Card } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

import { FETCH_ASSESSMENT_BY_USER_ID } from 'src/lib/graphql/Query'

const SubmittedAssessmentDetail = () => {
  const router = useRouter()
  const { userId } = router.query
  const [userData, setUserData] = React.useState<any>(null)
  const [getAssessments, { loading: assessmentLoading, error: assessmentError, data: assessmentData }] =
    useLazyQuery(FETCH_ASSESSMENT_BY_USER_ID)

  const [getUser, { loading: userLoading, error: userError }] = useLazyQuery(FETCH_USER_BY_ID, {
    onCompleted: data => {
      setUserData(data)
      getAssessments({ variables: { submittedAssessmentsUserId: userId } })
    }
  })

  React.useEffect(() => {
    getUser({ variables: { userId: userId } })
  }, [getUser, userId])

  if (userLoading || assessmentLoading) return <Spinner />

  if (userError || assessmentError) return <div>Error</div>

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <CustomAvatar
              src={userData?.user?.picture}
              variant='rounded'
              alt={userData?.user?.name}
              sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
            />

            <Typography variant='h6' sx={{ mb: 2 }}>
              {userData?.user?.name}
            </Typography>
            <CustomChip
              skin='light'
              size='small'
              label={userData?.user?.role.title}
              sx={{
                height: 20,
                fontWeight: 600,
                borderRadius: '5px',
                fontSize: '0.875rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { mt: -0.25 }
              }}
            />
          </CardContent>
          <CardContent sx={{ my: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
                <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3 }}>
                  <Icon icon='mdi:check' />
                </CustomAvatar>
                <div>
                  <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
                    {userData?.user?.assessments?.length}
                  </Typography>
                  <Typography variant='body2'>Assessments Created</Typography>
                </div>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3 }}>
                  <Icon icon='mdi:briefcase-variant-outline' />
                </CustomAvatar>
                <div>
                  <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
                    {assessmentData?.submittedAssessmentsUser?.length}
                  </Typography>
                  <Typography variant='body2'>Submitted Assessments</Typography>
                </div>
              </Box>
            </Box>
          </CardContent>
          <CardContent>
            <Typography variant='h6'>Details</Typography>
            <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
            <Box sx={{ pt: 2, pb: 1 }}>
              <Box sx={{ display: 'flex', mb: 2.7 }}>
                <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                  Username: {userData?.user?.name}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', mb: 2.7 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>
                Role:{userData?.user?.role.title}
              </Typography>
              <Typography variant='body2' sx={{ textTransform: 'capitalize' }}></Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SubmittedAssessmentDetail
