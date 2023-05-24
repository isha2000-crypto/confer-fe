import dynamic from 'next/dynamic'
import BlankLayoutWithAppBar from 'src/@core/layouts/BlankLayoutWithAppBar'
import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import Spinner from 'src/@core/components/spinner'
import React from 'react'
import { useMutation } from '@apollo/client'
import { INIT_SUBMITTED_ASSESSMENT } from 'src/lib/graphql/Mutation'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'

const ContainerVideoRecorder = dynamic(() => import('@components/organisms/ContainerVideoRecorder'), { ssr: false })
const DialogMediaOnboarding = dynamic(() => import('@components/molecules/Dialog/DialogMediaOnboarding'), {
  ssr: false
})

const Recorder = () => {
  const router = useRouter()
  const [initiatedAssessment, setInitiated] = React.useState<any>()
  const { assessmentId } = router.query
  const [getAssessment, { loading, error }] = useMutation(INIT_SUBMITTED_ASSESSMENT)
  const [mediaPermission, setMediaPermission] = React.useState<any>(false)

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await getAssessment({ variables: { initSubmittedAssessmentInput: { assessmentId } } })
      setInitiated(result.data.initSubmittedAssessment)
    }
    fetchData()
  }, [assessmentId, getAssessment])

  if (loading) return <Spinner />

  if (error) return <div>Error Occured</div>

  return (
    <>
      {initiatedAssessment && mediaPermission ? (
        <ContainerVideoRecorder initiatedSubmission={initiatedAssessment} />
      ) : null}
      <DialogMediaOnboarding setMediaPermissions={setMediaPermission} />
    </>
  )
}

Recorder.acl = {
  action: ACTIONS.CREATE,
  subject: SUBJECTS.ASSESSMENT_SUBMISSION
}

Recorder.getLayout = (page: ReactNode) => <BlankLayoutWithAppBar>{page}</BlankLayoutWithAppBar>
export default Recorder
