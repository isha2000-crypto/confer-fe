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

import { Task_Types } from '../../custom-types/enum'

// ** Third Party Imports

// ** Icon Imports

// ** Types

// const CustomInput = forwardRef((props, ref) => {
//   return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
// })

const Question = (props: { count: any }) => {
  // ** States
  // const [questionCount, setQuestionCount] = useState(0)

  // Handle Password

  // Handle Select
  // const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
  //   setLanguage(event.target.value as string[])
  // }
  // useEffect(() => {
  //   setQuestionCount(prevCount => prevCount + 1)
  // }, [])

  return (
    <Card>
      <CardHeader title={`Question ${props.count}`} />
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
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  Description
                </Typography>
                <TextField fullWidth multiline rows={4} placeholder='Description here' />
              </div>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='body2' sx={{ fontWeight: 600 }}>
                      Duration
                    </Typography>
                    <TextField
                      aria-label='minimum height'
                      minRows={12}
                      placeholder='Time to complete'
                      InputProps={{
                        endAdornment: (
                          <Typography variant='body2' sx={{ fontWeight: 600 }}>
                            seconds
                          </Typography>
                        )
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='body2' sx={{ fontWeight: 600 }}>
                      Task Type
                    </Typography>
                    <FormControl fullWidth>
                      <InputLabel id='task-type-select-label'>Task Type</InputLabel>
                      <Select
                        labelId='task-type-select-label'
                        id='task-type-select'

                        // value={taskType}
                        label='Task Type'

                        // onChange={e => setTaskType(e.target.value)}
                      >
                        <MenuItem value='design'>{Task_Types.COMMUNICATION}</MenuItem>
                        <MenuItem value='development'>{Task_Types.LEADERSHIP}</MenuItem>
                        <MenuItem value='testing'>{Task_Types.PROGRAMMING}</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </Grid>
              </Grid>
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

export default Question
