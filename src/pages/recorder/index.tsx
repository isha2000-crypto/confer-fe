// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Icon from 'src/@core/components/icon'

const Recorder = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card sx={styles.container}>
          <CardHeader title='Assessment Name'></CardHeader>
          <CardContent>
            <Card sx={styles.videoContainer}>
              <CardContent>
                <Card sx={styles.questionContainer}>
                  <CardContent>
                    <svg height='51' width='500'>
                      <circle cx='100' cy='25' r='10' fill='red' />
                      <line x1='110' y1='25' x2='200' y2='25' style={{ stroke: 'blue', strokeWidth: 2 }} />
                      <circle cx='210' cy='25' r='10' fill='red' />
                    </svg>
                    <Card sx={styles.questionCard}>
                      <CardContent>
                        <Typography paragraph={true}>Question Question Question Question Question Question </Typography>
                      </CardContent>
                    </Card>
                    <Icon icon='mdi:record' fontSize={30} color={'red'} />
                    <Icon icon='mdi:play' fontSize={30} color={'grey'} />
                    <Icon icon='mdi:refresh' fontSize={30} color={'grey'} />
                    <Icon icon='mdi:pause' fontSize={30} color={'grey'} />
                    <Icon icon='mdi:tick' fontSize={30} color={'grey'} />
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

const styles = {
  container: {
    display: 'grid',
    height: '77vh',
    width: '98%',
    background: 'lightblue'
  },
  videoContainer: {
    display: 'grid',
    height: '65vh',
    width: '100%',
    background: 'lightgreen'
  },
  questionContainer: {
    display: 'grid',
    alignSelf: 'end',
    alignContent: 'center',
    height: '25vh',
    width: '100%',
    background: 'lightyellow'
  },
  questionCard: {
    display: 'grid',
    height: '12vh',
    width: '100%',
    background: 'cyan'
  }
}

export default Recorder
