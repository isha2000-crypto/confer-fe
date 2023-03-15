import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Icon from 'src/@core/components/icon'
import Timeline from 'src/containers/atoms/timeline'
import RecordTimer from 'src/containers/atoms/recordTimer'
import dynamic from 'next/dynamic'

const VideoRecorder = dynamic(() => import('../../components/molecules/VideoRecorder'))

const Recorder = () => {
  return (
    <Grid container spacing={12}>
      <Grid item xs={12}>
        <Card className='container' sx={{ flexWrap: 'wrap', height: '100%' }}>
          <CardHeader title='Assessment Name'></CardHeader>
          <CardContent sx={{ flexWrap: 'wrap', height: '100%' }}>
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
                      <Timeline totalCheckPoints={10} currentCheckPoint={6} />
                    </div>
                    <Card className='questionCard'>
                      <CardContent>
                        <Typography paragraph={true}>Question Question Question Question Question Question </Typography>
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

export default Recorder
