import { useState } from 'react'
import { URLS } from '@custom-types/constants'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Question from '../../molecules/Question'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import { Task_Types } from '.././../../custom-types/enum'
import { Alert } from '@mui/material'
import { useMutation } from '@apollo/client'
import { CREATE_ASSESSMENT_MUTATION } from 'src/lib/graphql/Mutation'
import { CSSTransition } from 'react-transition-group'
import { useRouter } from 'next/router'

interface Question {
  id: number
  type: string
  description: string
  duration: number
}

const CreateAssessmentForm = () => {
  const [questions, setQuestions] = useState<Question[]>([])

  const [submitAss, setSubmit] = useState(false)

  const [assessment, setAssessment] = useState({
    title: '',
    description: '',
    type: 'LEADERSHIP'
  })
  const [isAllowed, setAllowed] = useState(false)

  const [createAssessmentMutation] = useMutation(CREATE_ASSESSMENT_MUTATION)
  const router = useRouter()
  const handleTitleChange = (event: any) => {
    setAssessment(prevState => ({
      ...prevState,
      title: event.target.value
    }))
  }

  const handleDescriptionChange = (event: any) => {
    setAssessment(prevState => ({
      ...prevState,
      description: event.target.value
    }))
  }

  const handleTypeChange = (event: any) => {
    setAssessment(prevState => ({
      ...prevState,
      type: event.target.value
    }))
  }

  const addQuestion = () => {
    const newQuestion: Question = {
      id: questions.length + 1,
      type: 'TEXTUAL',
      description: '',
      duration: 60
    }
    setQuestions([...questions, newQuestion])
  }

  const removeQuestion = (index: number) => {
    const updatedQuestions = [...questions]
    updatedQuestions.splice(index, 1)
    setQuestions([...updatedQuestions])
  }

  const handleQuestionUpdate = (index: number, name: string, value: string | number) => {
    const updateQuestions: any = [...questions]
    updateQuestions[index][name] = value
    setQuestions([...updateQuestions])
  }

  const handleAssessmentSubmit = (event: any) => {
    event.preventDefault()
    let isFormValid = true
    if (questions.length === 0 || assessment.title === '' || assessment.description === '' || assessment.type === '') {
      alert('Please fill in all fields')

      return
    }

    const modifiedQuestions = questions.map(question => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = question
      if (question.type === '' || question.description === '' || question.duration < 60) {
        alert('Please Make Sure Question Fields are Valid!!')
        isFormValid = false
      }

      return rest
    })
    if (!isFormValid) {
      console.log('Form is Not valid')

      return
    }

    createAssessmentMutation({
      variables: { createAssessmentInput: { ...assessment, tasks: modifiedQuestions } }
    })
      .then(result => {
        console.log(result.data)
        setSubmit(true)
        router.push(`${URLS.ASSESSMENT_URL}/available`)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <>
      <Card>
        <form onSubmit={handleAssessmentSubmit}>
          <br />
          <span style={{ paddingLeft: '80%', paddingTop: '10px' }}>
            <Button size='large' type='submit' variant='contained' sx={{ width: '10%' }}>
              submit
            </Button>
            <div style={{ width: '21%', marginLeft: '37%' }}>
              {submitAss && <Alert severity='success'>Assessment Created Successfully</Alert>}
            </div>

            <h3 style={{ paddingLeft: '25px' }}> Create Assessment</h3>
          </span>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  type='title'
                  label='Title'
                  placeholder='Task'
                  value={assessment.title}
                  onChange={handleTitleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <TextField
                    fullWidth
                    multiline
                    required
                    label='Description'
                    rows={4}
                    placeholder='Description here'
                    value={assessment.description}
                    onChange={handleDescriptionChange}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <FormControl fullWidth sx={{ alignSelf: 'center' }}>
                    <InputLabel id='assessment-type-select-label'>Assessment Type</InputLabel>
                    <Select
                      labelId='assessment-type-select-label'
                      id='assessment-type-select'
                      label='assessment Type'
                      value={assessment.type}
                      onChange={handleTypeChange}
                      required
                    >
                      <MenuItem value='CODING'>{Task_Types.CODING}</MenuItem>
                      <MenuItem value='LEADERSHIP'>{Task_Types.LEADERSHIP}</MenuItem>
                    </Select>
                  </FormControl>
                  <br />
                </div>
              </Grid>
              <br />
              <Grid container>
                {' '}
                {questions.map((q, index) => (
                  <Grid item key={index} sx={{ mb: 3 }}>
                    <>
                      <br />
                      <Question
                        count={index}
                        {...q}
                        removeQuestion={removeQuestion}
                        handleQuestionUpdate={handleQuestionUpdate}
                      />
                    </>
                  </Grid>
                ))}
              </Grid>

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
