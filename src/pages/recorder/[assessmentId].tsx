import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import dynamic from 'next/dynamic'
import BlankLayoutWithAppBar from 'src/@core/layouts/BlankLayoutWithAppBar'
import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { Assessment } from '@custom-types/assessmentsType'
import React from 'react'

const ContainerVideoRecorder = dynamic(() => import('@components/organisms/ContainerVideoRecorder'))

// const VideoRecorder = dynamic(() => import('../../components/molecules/VideoRecorder'))

const Recorder = () => {
  const router = useRouter()
  const { assessmentId } = router.query

  // const assessment = useSelector((state: RootState) =>
  //   state.assessments.assessments.find(assess => assess.id === assessmentId)
  // )

  const assessment: Assessment = {
    id: '1',
    author: 'Husnain',
    type: 'CODING',
    time: '3000',
    tasks: [
      {
        id: '1',
        type: 'TEXTUAL',
        description: 'Explain the difference between useMemo and useCallback in React.',
        duration: 300
      },
      {
        id: '2',
        type: 'TEXTUAL',
        description: 'What is promise constructor anti-pattern?',
        duration: 300
      },
      {
        id: '3',
        type: 'TEXTUAL',
        description: 'useRef can store references to DOM nodes, what other things can it do?',
        duration: 300
      },
      {
        id: '4',
        type: 'TEXTUAL',
        description: 'Explain cyclic dependency in Node.js and how to resolve it?',
        duration: 300
      },
      {
        id: '5',
        type: 'TEXTUAL',
        description: 'Difference between setImmediate and setInterval function in Node.js',
        duration: 300
      }
    ],
    title: 'MERN stack application Assesment',
    responses: '33'
  }

  console.log('Assessment: ', assessment)

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
