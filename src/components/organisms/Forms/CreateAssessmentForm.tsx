import { useState } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Question from '../../molecules/Question'
import AddIcon from '@mui/icons-material/Add'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import { Task_Types } from '.././../../custom-types/enum'

interface Question {
  id: number
  question: JSX.Element
}

const CreateAssessmentForm = () => {
  const [questions, setQuestions] = useState<Question[]>([])

  const [showQuestionForm, setShowQuestionForm] = useState(false)
  const [count, setCount] = useState(0)

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      question: <Question count={count + 1} /> // Pass count prop to the Question component
    }
    setQuestions([...questions, newQuestion])
    setCount(count + 1)
    setShowQuestionForm(false)
  }
  const removeQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id))
  }

  return (
    <Card>
      <CardHeader title='Create Assessment' />
      <Divider sx={{ m: '0 !important' }} />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <TextField fullWidth type='title' label='Title' placeholder='Task' />
            </Grid>
            <Grid item xs={12} sm={12}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField fullWidth multiline label='Description' rows={4} placeholder='Description here' />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <br />
                <FormControl fullWidth sx={{ alignSelf: 'center' }}>
                  <InputLabel id='task-type-select-label'>Task Type</InputLabel>
                  <Select
                    labelId='task-type-select-label'
                    id='task-type-select'
                    label='Task Type'

                    // onChange={e => setTaskType(e.target.value)}
                  >
                    <MenuItem value='design'>{Task_Types.COMMUNICATION}</MenuItem>
                    <MenuItem value='development'>{Task_Types.LEADERSHIP}</MenuItem>
                    <MenuItem value='testing'>{Task_Types.PROGRAMMING}</MenuItem>
                  </Select>
                </FormControl>
                <br />
              </div>
            </Grid>
            <br />
            <Grid>
              {' '}
              {questions.map(q => (
                <Box key={q.id} sx={{ mb: 3 }}>
                  {q.question}
                  <br />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button onClick={() => removeQuestion(q.id)} size='small' variant='contained'>
                      Remove
                    </Button>
                  </div>
                </Box>
              ))}
            </Grid>

            {showQuestionForm ? <Question count={count + 1} /> : null}
            {/* <Button color='secondary' onClick={handleQuestionForm} startIcon={<AddIcon />} sx={{ mt: 3 }}>
              Add Question
            </Button> */}
            {showQuestionForm}
            <br />
            <Divider sx={{ mb: '0 !important' }} />
            <Grid item container justifyContent='center'>
              <Button
                onClick={addQuestion}
                className='add-question-button'
                sx={{
                  width: '100%',
                  fontSize: '1.5rem',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                  transition: 'all 0.3s ease',
                  border: '4px dotted grey',
                  color: 'grey',
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
export default CreateAssessmentForm
