import React from 'react'

// ** MUI Imports
import { useRouter } from 'next/router'

import { useLazyQuery } from '@apollo/client'
import { FETCH_ASSESSMENT_BY_ID } from 'src/lib/graphql/Query'
import Spinner from 'src/@core/components/spinner'
import { Card } from '@mui/material'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'
import CreateAssessmentForm from '../../../../components/organisms/Forms/CreateAssessmentForm'

const EditAssessmentCreation = () => {
  const router = useRouter()
  const { createdAssessmentId } = router.query
  const [createdAssessment, setCreatedAssessment] = React.useState<any>(null)
  const [getAssessment, { loading, error }] = useLazyQuery(FETCH_ASSESSMENT_BY_ID)

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await getAssessment({ variables: { createdAssessmentId: createdAssessmentId } })
      setCreatedAssessment(result.data.submittedAssessment)
    }

    fetchData()
  }, [getAssessment, createdAssessmentId])

  if (loading) return <Spinner />

  if (error) return <div>Error</div>

  return (
    <>
      <CreateAssessmentForm />
    </>
  )
}
export default EditAssessmentCreation
