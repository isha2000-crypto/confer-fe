import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Icon from 'src/@core/components/icon'
import Timeline from 'src/containers/atoms/timeline'
import RecordTimer from 'src/containers/atoms/recordTimer'
import dynamic from 'next/dynamic'
import BlankLayoutWithAppBar from 'src/@core/layouts/BlankLayoutWithAppBar'
import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { getAssessmentById } from 'src/store/assessments/assessments.selectors'
import { RootState } from 'src/store'
import { Task } from '@custom-types/assessmentsType'
import React from 'react'

const VideoRecorder = dynamic(() => import('../../components/molecules/VideoRecorder'))

const Recorder = () => {
  const router = useRouter()
  const { assessmentId } = router.query

  const assessment = useSelector((state: RootState) =>
    state.assessments.assessments.find(assess => assess.id === assessmentId)
  )

  const [currentTask, setCurrentTask] = React.useState<Task>(assessment?.tasks[0])
  const [currentCheckPoint, setCurrentCheckpoint] = React.useState<number>(0)

  console.log('Assessment: ', assessment)

  return (
    <Grid container>
      <Grid item xs={12}>
        <Card sx={{ flexWrap: 'wrap', height: '100%' }}>
          <CardHeader title='Assessment Name'></CardHeader>
          <CardContent sx={{ flexWrap: 'wrap', height: '80%' }}>
            <Grid container sx={{ flexWrap: 'wrap', height: '100%' }} spacing={6} columnGap={6}>
              <Grid item xs={12}>
                <Card
                  className='videoContainer'
                  sx={{ maxWidth: '100%', height: 'auto', display: 'flex', flexDirection: 'column' }}
                >
                  <VideoRecorder />
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card className='questionContainer'>
                  <CardContent>
                    <div className='timelineContainer' style={{ width: '100%' }}>
                      <Timeline totalCheckPoints={assessment?.tasks.length} currentCheckPoint={currentCheckPoint} />
                    </div>
                    <Card className='questionCard'>
                      <CardContent>
                        <Typography paragraph={true}>{currentTask.description}</Typography>
                      </CardContent>
                    </Card>
                    <div className='buttonsContainer'>
                      <Icon icon='mdi:refresh' fontSize={30} color={'grey'} />
                      <Icon icon='mdi:record' fontSize={30} color={'red'} />
                      <Icon icon='mdi:tick' fontSize={30} color={'grey'} />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

Recorder.getLayout = (page: ReactNode) => <BlankLayoutWithAppBar>{page}</BlankLayoutWithAppBar>
export default Recorder
