// import React, { useEffect } from 'react'

// // ** MUI Imports
// import { useRouter } from 'next/router'

// import { useLazyQuery } from '@apollo/client'
// import { FETCH_ASSESSMENT_BY_ID } from 'src/lib/graphql/Query'
// import Spinner from 'src/@core/components/spinner'

// import AssessmentForm from '../../../../components/organisms/Forms/AssessmentForm'

// const ViewAssessment = () => {
//   const router = useRouter()
//   const { assessmentId } = router.query
//   const [viewAssessment, setViewAssessment] = React.useState<any>(null)
//   const [getAssessment, { loading, error }] = useLazyQuery(FETCH_ASSESSMENT_BY_ID)

//   useEffect(() => {
//     const fetchData = async () => {
//       const { data } = await getAssessment({ variables: { assessmentId: assessmentId } })
//       const assessment = data?.assessment
//       console.log('assessment data', assessment)

//       const updatedTasks = assessment.tasks.map((task: any) => ({
//         ...task,
//         duration: task.duration
//       }))

//       const updatedAssessment = {
//         ...assessment,
//         tasks: updatedTasks
//       }

//       setViewAssessment(updatedAssessment)
//     }

//     fetchData()
//   }, [getAssessment, assessmentId])

//   if (loading) return <Spinner />

//   if (error) return <div>Error</div>
//   console.log('vieww ass', viewAssessment)

//   return (
//     <>
//       {viewAssessment && (
//         <AssessmentForm
//           isReadOnly={true}
//           isEdit={false}
//           assessmentId={assessmentId}
//           initialAssessment={viewAssessment}
//         />
//       )}
//     </>
//   )
// }

// export default ViewAssessment

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

  return (
    <>
      {viewAssessment && (
        <AssessmentForm
          isReadOnly={true}
          isEdit={false}
          assessmentId={assessmentId}
          initialAssessment={viewAssessment}
        />
      )}
    </>
  )
}

export default ViewAssessment
