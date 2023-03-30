// ** React Imports

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

import TextField from '@mui/material/TextField'
import TextArea from '@mui/material/TextareaAutosize'
import CardHeader from '@mui/material/CardHeader'

import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

// ** Third Party Imports

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types

// const CustomInput = forwardRef((props, ref) => {
//   return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
// })

const FormLayoutsSeparator = () => {
  // ** States

  // Handle Password

  // Handle Select
  // const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
  //   setLanguage(event.target.value as string[])
  // }

  return (
    <Card>
      <CardHeader title='Question' />
      <Divider sx={{ m: '0 !important' }} />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Title
                <TextField fullWidth type='title' label='title' placeholder='task' />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Description
                <TextArea aria-label='minimum height' minRows={12} placeholder='Description here' />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Duration
                <TextField aria-label='minimum height' minRows={12} placeholder='Description here' />
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ m: '0 !important' }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Submit
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormLayoutsSeparator
