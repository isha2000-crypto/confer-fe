import { useState } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Question from '../../components/atoms/Question'
import AddIcon from '@mui/icons-material/Add'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import { Task_Types } from '../../custom-types/enum'

const FormLayoutsSeparator = () => {
  const [questions, setQuestions] = useState([])

  const [showQuestionForm, setShowQuestionForm] = useState(false)
  const [count, setCount] = useState(0)

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      question: <Question count={count + 1} /> // Pass count prop to the Question component
    }
    setQuestions([...questions, newQuestion])
    setCount(count + 1)
  }

  return (
    <Card>
      <CardHeader title='Create Assessment' />
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
            <Grid item xs={6}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  Task Type
                </Typography>
                <FormControl fullWidth sx={{ alignSelf: 'center' }}>
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

            {questions.map(q => (
              <Box key={q.id} sx={{ mb: 3 }}>
                {q.question}
              </Box>
            ))}
            {showQuestionForm ? <Question count={count + 1} /> : null}
            {/* <Button color='secondary' onClick={handleQuestionForm} startIcon={<AddIcon />} sx={{ mt: 3 }}>
              Add Question
            </Button> */}

            <Divider sx={{ mb: '0 !important' }} />
            <Grid item container justifyContent='center'>
              <Button
                onClick={addQuestion}
                startIcon={<AddIcon />}
                sx={{
                  width: '100%',
                  fontSize: '1.5rem',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#1976d2',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.25)'
                  }
                }}
              >
                Add Question
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ m: '0 !important' }} />
      </form>
    </Card>
  )
}

export default FormLayoutsSeparator
