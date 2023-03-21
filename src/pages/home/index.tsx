//** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

const HomePage = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push('/assessments/available')
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Welcome To Confer'></CardHeader>
          <CardContent>
            <Typography sx={{ marginBottom: '2rem' }}>
              Increase your confidence by completing video assessments. You can retake video as many times as you want,
              <br />
              once you are comfortable with the results, you can submit them. Click on the Below link to find
              assessments which you can complete.
            </Typography>
            <Button variant='contained' color='primary' onClick={handleClick}>
              View Assessments
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default HomePage
