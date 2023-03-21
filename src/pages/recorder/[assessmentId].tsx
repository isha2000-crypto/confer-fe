import Grid from '@mui/material/Grid'
import dynamic from 'next/dynamic'
import BlankLayoutWithAppBar from 'src/@core/layouts/BlankLayoutWithAppBar'
import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import Spinner from 'src/@core/components/spinner'
import { useSelector } from 'react-redux'
import React from 'react'

const ContainerVideoRecorder = dynamic(() => import('@components/organisms/ContainerVideoRecorder'))

// const VideoRecorder = dynamic(() => import('../../components/molecules/VideoRecorder'))

const Recorder = () => {
  const router = useRouter()
  const { assessmentId } = router.query

  const { loading, assessments, error } = useSelector((state: RootState) => state.assessments)

  const assessment = assessments.find(assess => assess._id === assessmentId)

  console.log('Assessment: ', assessment)

  if (loading) return <Spinner />

  if (error) return <div>Error Occured</div>

  return (
    <Grid container>
      <Grid item xs={12}>
        <ContainerVideoRecorder assessment={assessment} />
      </Grid>
    </Grid>
  )
}

Recorder.getLayout = (page: ReactNode) => <BlankLayoutWithAppBar>{page}</BlankLayoutWithAppBar>
export default Recorder
