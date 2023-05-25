import React from 'react'

// ** MUI Imports
import { useRouter } from 'next/router'

import { useLazyQuery } from '@apollo/client'
import { FETCH_ASSESSMENT_BY_ID } from 'src/lib/graphql/Query'
import Spinner from 'src/@core/components/spinner'

import AssessmentForm from '../../../../components/organisms/Forms/AssessmentForm'

const ViewAssessment = () => {
  const router = useRouter()
  const { assessmentId } = router.query
  const [viewAssessment, setViewAssessment] = React.useState<any>(null)
  const [getAssessment, { loading, error }] = useLazyQuery(FETCH_ASSESSMENT_BY_ID)

  React.useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAssessment({ variables: { assessmentId: assessmentId } })
      setViewAssessment(data?.assessment)
    }

    fetchData()
  }, [getAssessment, assessmentId])

  if (loading) return <Spinner />

  if (error) return <div>Error</div>
  console.log('specified assessment', viewAssessment?._id)

  return (
    <>
      {viewAssessment && (
        <AssessmentForm
          viewAssessment={viewAssessment}
          isReadOnly={true}
          isEdit={false} // Add the missing prop
          assessmentId={assessmentId} // Add the missing prop
          initialAssessment={null} // or pass the appropriate value
        />
      )}
    </>
  )
}

export default ViewAssessment
