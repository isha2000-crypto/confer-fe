import React from 'react'

// ** MUI Imports
import { useRouter } from 'next/router'

import { useLazyQuery } from '@apollo/client'
import { FETCH_ASSESSMENT_BY_ID } from 'src/lib/graphql/Query'
import Spinner from 'src/@core/components/spinner'

import CreateAssessmentForm from '../../../../components/organisms/Forms/AssessmentForm'

const EditAssessmentCreation = () => {
  const router = useRouter()
  const { assessmentId } = router.query
  const [createdAssessment, setCreatedAssessment] = React.useState<any>(null)
  const [getAssessment, { loading, error }] = useLazyQuery(FETCH_ASSESSMENT_BY_ID)

  React.useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAssessment({ variables: { assessmentId: assessmentId } })
      setCreatedAssessment(data?.assessment)
    }

    fetchData()
  }, [getAssessment, assessmentId])

  if (loading) return <Spinner />

  if (error) return <div>Error</div>

  return (
    <>
      {createdAssessment && (
        <CreateAssessmentForm isEdit assessmentId={assessmentId} initialAssessment={createdAssessment} />
      )}
    </>
  )
}

export default EditAssessmentCreation
