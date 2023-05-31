import React from 'react'

// ** MUI Imports
import { useRouter } from 'next/router'
import ViewSubmittedAssessment from '@components/organisms/SubmittedAssessments/ViewSubmittedAssessment'
import { useLazyQuery } from '@apollo/client'
import { SUBMITTED_ASSESSMENT_BY_ID } from 'src/lib/graphql/Query'
import Spinner from 'src/@core/components/spinner'
import { Card, Theme, useMediaQuery } from '@mui/material'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'

const SubmittedAssessmentDetail = () => {
  const router = useRouter()
  const { submittedAssessmentId } = router.query
  const [submittedAssessment, setSubmittedAssessment] = React.useState<any>(null)
  const [getAssessment, { loading, error }] = useLazyQuery(SUBMITTED_ASSESSMENT_BY_ID)
  const largeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await getAssessment({ variables: { submittedAssessmentId: submittedAssessmentId } })
      setSubmittedAssessment(result.data?.submittedAssessment)
    }

    fetchData()
  }, [getAssessment, submittedAssessmentId])

  if (loading) return <Spinner />

  if (error) return <div>Error</div>

  return (
    <Card sx={{ padding: largeScreen ? '2rem' : '1rem' }}>
      {submittedAssessment && <ViewSubmittedAssessment data={submittedAssessment} />}
    </Card>
  )
}

SubmittedAssessmentDetail.acl = {
  action: ACTIONS.READ,
  subject: SUBJECTS.ASSESSMENT_SUBMISSION
}

export default SubmittedAssessmentDetail
