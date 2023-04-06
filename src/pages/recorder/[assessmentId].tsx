import dynamic from 'next/dynamic'
import BlankLayoutWithAppBar from 'src/@core/layouts/BlankLayoutWithAppBar'
import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import Spinner from 'src/@core/components/spinner'
import React from 'react'
import { useLazyQuery } from '@apollo/client'
import { FETCH_ASSESSMENT_BY_ID } from 'src/lib/graphql/Query'

const ContainerVideoRecorder = dynamic(() => import('@components/organisms/ContainerVideoRecorder'))

// const VideoRecorder = dynamic(() => import('../../components/molecules/VideoRecorder'))

const Recorder = () => {
  const router = useRouter()
  const [assessment, setAssessment] = React.useState<any>()
  const { assessmentId } = router.query
  const [getAssessment, { loading, error }] = useLazyQuery(FETCH_ASSESSMENT_BY_ID)

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await getAssessment({ variables: { assessmentId: assessmentId } })
      setAssessment(result.data.assessment)
    }
    fetchData()
  }, [assessmentId, getAssessment])

  if (loading) return <Spinner />

  if (error) return <div>Error Occured</div>

  return <>{assessment && <ContainerVideoRecorder assessment={assessment} />}</>
}

Recorder.getLayout = (page: ReactNode) => <BlankLayoutWithAppBar>{page}</BlankLayoutWithAppBar>
export default Recorder
