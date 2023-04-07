// ** React Imports

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

import TextField from '@mui/material/TextField'

import CardHeader from '@mui/material/CardHeader'

import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'

import { Task_Types } from '../../custom-types/enum'

// ** Third Party Imports

// ** Icon Imports

// ** Types

const CustomCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#F4F4F4',
  boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
  width: '100%'
}))

const Question = (props: { count: any }) => {
  // ** States

  return (
    <div style={{ boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)' }}>
      <CardHeader title={`Question ${props.count}`} />
      <Divider sx={{ m: '0 !important' }} />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Title
              </Typography>
              <TextField fullWidth type='title' placeholder='Task' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Task Type
              </Typography>
              <FormControl fullWidth variant='standard'>
                <InputLabel id='task-type-select-label'>Select task type</InputLabel>
                <Select
                  labelId='task-type-select-label'
                  id='task-type-select'
                  // value={taskType}
                  label='Select task type'

                  // onChange={e => setTaskType(e.target.value)}
                >
                  <MenuItem value='design'>{Task_Types.COMMUNICATION}</MenuItem>
                  <MenuItem value='development'>{Task_Types.LEADERSHIP}</MenuItem>
                  <MenuItem value='testing'>{Task_Types.PROGRAMMING}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Description
              </Typography>
              <TextField fullWidth multiline rows={4} placeholder='Description here' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Duration
              </Typography>
              <TextField
                fullWidth
                type='number'
                placeholder='Time to complete (in seconds)'
                InputProps={{
                  endAdornment: (
                    <Typography variant='body2' sx={{ fontWeight: 600 }}>
                      seconds
                    </Typography>
                  )
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ m: '0 !important' }} />
        <CardActions>
          <Button size='large' type='submit' variant='contained'>
            Submit
          </Button>
        </CardActions>
      </form>
    </div>
  )
}

export default Question
