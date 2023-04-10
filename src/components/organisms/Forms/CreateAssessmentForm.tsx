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
import { Icon } from '@mui/material'
import Icon1 from 'src/@core/components/icon'

import { CSSTransition } from 'react-transition-group'

interface Question {
  id: number
  question: JSX.Element
}

const CreateAssessmentForm = () => {
  const [questions, setQuestions] = useState<Question[]>([])

  const [showQuestionForm, setShowQuestionForm] = useState(false)
  const [count, setCount] = useState(0)
  const [assessment, setAssessment] = useState({
    title: '',
    description: '',
    type: '',
    questions: []
  })

  const handleTitleChange = event => {
    setAssessment(prevState => ({
      ...prevState,
      title: event.target.value
    }))
  }

  const handleDescriptionChange = event => {
    setAssessment(prevState => ({
      ...prevState,
      description: event.target.value
    }))
  }

  const handleTypeChange = event => {
    setAssessment(prevState => ({
      ...prevState,
      type: event.target.value
    }))
  }

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      question: (
        <Question count={count + 1} handleQuestionUpdate={handleQuestionUpdate} removeQuestion={removeQuestion} />
      ) // Pass count prop to the Question component
    }
    setQuestions([...questions, newQuestion])
    setCount(count + 1)
    setShowQuestionForm(false)
  }
  const removeQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id))
  }
  const handleQuestionUpdate = (index, data) => {
    setQuestions(prevState => {
      const updatedQuestions = [...prevState]
      updatedQuestions[index] = data

      return updatedQuestions
    })
  }
  const handleAssessmentSubmit = event => {
    event.preventDefault()

    const assessmentData = {
      title: assessment.title,
      description: assessment.description,
      type: assessment.type,
      questions: questions.map(q => q.question)
    }
    console.log('Assessment data here', assessmentData)

    // send assessmentData to your backend for storage
  }
  console.log('Asessment des', assessment.description)
  console.log('Asessment ques', assessment.questions)
  console.log('Asessment title', assessment.title)
  console.log('Asessment type', assessment.type)
  console.log('Question here', questions)

  return (
    <>
      <Card>
        <br />
        <span style={{ paddingLeft: '80%', paddingTop: '10px' }}>
          <Button onClick={handleAssessmentSubmit} size='large' type='submit' variant='contained' sx={{ width: '10%' }}>
            submit
          </Button>
          <h3 style={{ paddingLeft: '25px' }}> Create Assessment</h3>
        </span>

        <form onSubmit={e => e.preventDefault()}>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type='title'
                  label='Title'
                  placeholder='Task'
                  value={assessment.title} // add value prop to reflect the state
                  onChange={handleTitleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <TextField
                    fullWidth
                    multiline
                    label='Description'
                    rows={4}
                    placeholder='Description here'
                    value={assessment.description} // add value prop to reflect the state
                    onChange={handleDescriptionChange}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <br />
                  <FormControl fullWidth sx={{ alignSelf: 'center' }}>
                    <InputLabel id='assessment-type-select-label'>Assessment Type</InputLabel>
                    <Select
                      labelId='assessment-type-select-label'
                      id='assessment-type-select'
                      label='assessment Type'
                      value={assessment.type} // add value prop to reflect the state
                      onChange={handleTypeChange}

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
                      {/* <Button onClick={() => removeQuestion(q.id)} size='small' variant='contained'>
                      Remove
                    </Button> */}
                    </div>
                  </Box>
                ))}
              </Grid>

              {showQuestionForm && (
                <CSSTransition classNames='question' timeout={300}>
                  <Question count={count + 1} />
                </CSSTransition>
              )}
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
    </>
  )
}
export default CreateAssessmentForm
