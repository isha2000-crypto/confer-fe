import React, { useEffect } from 'react'

// ** MUI Imports
import { useRouter } from 'next/router'

import { useLazyQuery } from '@apollo/client'
import { FETCH_ASSESSMENT_BY_ID } from 'src/lib/graphql/Query'
import Spinner from 'src/@core/components/spinner'

import AssessmentForm from '../../../../components/organisms/Forms/AssessmentForm'

const EditAssessmentCreation = () => {
  const router = useRouter()
  const { assessmentId } = router.query
  const [initialAssessment, setInitialAssessment] = React.useState<any>(null)
  const [getAssessment, { loading, error }] = useLazyQuery(FETCH_ASSESSMENT_BY_ID)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAssessment({ variables: { assessmentId: assessmentId } })
      const assessment = data?.assessment

      const updatedTasks = assessment.tasks.map((task: any) => ({
        ...task,
        duration: task.duration
      }))

      const updatedAssessment = {
        ...assessment,
        tasks: updatedTasks
      }

      setInitialAssessment(updatedAssessment)
    }

    fetchData()
  }, [getAssessment, assessmentId])

  if (loading) return <Spinner />

  if (error) return <div>Error</div>

  return (
    <>
      {initialAssessment && <AssessmentForm isEdit assessmentId={assessmentId} initialAssessment={initialAssessment} />}
    </>
  )
}

export default EditAssessmentCreation
