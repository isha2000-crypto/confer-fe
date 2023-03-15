import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Icon from 'src/@core/components/icon'
import Timeline from 'src/containers/atoms/timeline'
import RecordTimer from 'src/containers/atoms/recordTimer'

const Recorder = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card className='container'>
          <CardHeader title='Assessment Name'></CardHeader>
          <CardContent>
            <Card className='videoContainer'>
              <CardContent sx={{ display: 'grid' }}>
                <Card className='questionContainer'>
                  <div className='timelineContainer'>
                    <Timeline totalCheckPoints={10} currentCheckPoint={6} />
                  </div>
                  <Card className='questionCard'>
                    <CardContent>
                      <Typography paragraph={true}>Question Question Question Question Question Question </Typography>
                    </CardContent>
                  </Card>
                  <div className='buttonsContainer'>
                    <Icon icon='mdi:refresh' fontSize={30} color={'grey'} />
                    <RecordTimer />
                    <Icon icon='mdi:tick' fontSize={30} color={'grey'} />
                  </div>
                </Card>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Recorder
