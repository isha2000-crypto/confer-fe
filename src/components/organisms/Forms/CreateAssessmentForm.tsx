import { useState } from 'react'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Question from '../../molecules/AssessmentQuestions/Question'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { Task_Types } from '.././../../custom-types/enum'

import { useMutation } from '@apollo/client'
import { CREATE_ASSESSMENT_MUTATION } from 'src/lib/graphql/Mutation'
import toast from 'react-hot-toast'

import { validationSchema } from '../../../lib/schema/validationSchema'
import { Formik } from 'formik'

interface Question {
  id: number
  type: string
  description: string
  duration: number
}

const CreateAssessmentForm = () => {
  const [questions, setQuestions] = useState<Question[]>([])

  const [submitAss, setSubmit] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [assessment, setAssessment] = useState({
    title: '',
    description: '',
    type: 'LEADERSHIP'
  })

  const [createAssessmentMutation] = useMutation(CREATE_ASSESSMENT_MUTATION)

  const containerStyle = {
    backgroundColor: 'background.default',
    borderRadius: '20px',
    padding: '20px',
    margin: '20px 0',
    width: '100%',
    marginLeft: '20px'
  }

  const addQuestion = () => {
    setShowAdd(true)
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
        setTimeout(() => {
          resetForm()
        }, 2000)
      })
      .catch(error => {
        console.error(error)
      })
  }
  const resetForm = () => {
    setAssessment({
      title: '',
      description: '',
      type: ''
    })
    setQuestions([])
    setSubmit(false)
    setShowAdd(false)
  }

  return (
    <>
      <Card>
        <Formik
          initialValues={{
            title: '',
            description: '',
            type: '',
            questions: questions
          }}
          validationSchema={validationSchema}
          onSubmit={handleAssessmentSubmit}
        >
          {formik => (
            <form onSubmit={handleAssessmentSubmit}>
              <h3 style={{ paddingLeft: '25px', paddingTop: '10px' }}> Create Assessment</h3>

              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={6}>
                    <TextField
                      required
                      fullWidth
                      type='title'
                      label='Title'
                      name='title'
                      placeholder='Task'
                      value={assessment.title}
                      onChange={event => {
                        setAssessment({ ...assessment, title: event.target.value })
                        formik.handleChange(event)
                      }}
                      error={formik.touched.title && Boolean(formik.errors.title)}
                      helperText={formik.touched.title && formik.errors.title}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '15px' }}>
                      <TextField
                        fullWidth
                        multiline
                        required
                        label='Description'
                        name='description'
                        rows={4}
                        value={assessment.description}
                        onChange={event => {
                          setAssessment({ ...assessment, description: event.target.value })
                          formik.handleChange(event)
                        }}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '15px' }}>
                      <FormControl fullWidth sx={{ alignSelf: 'center' }}>
                        <InputLabel id='assessment-type-select-label'>Assessment Type</InputLabel>
                        <Select
                          labelId='assessment-type-select-label'
                          id='assessment-type-select'
                          label='assessment Type'
                          name='type'
                          value={formik.values.type}
                          onChange={formik.handleChange}
                          error={formik.touched.type && Boolean(formik.errors.type)}
                          required
                        >
                          <MenuItem value='CODING'>{Task_Types.CODING}</MenuItem>
                          <MenuItem value='LEADERSHIP'>{Task_Types.LEADERSHIP}</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </Grid>
                  {showAdd && questions.length !== 0 && (
                    <Grid container sx={containerStyle}>
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
                  )}

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
              <Button
                size='large'
                type='submit'
                variant='contained'
                sx={{ width: '10%', marginTop: '10px', marginBottom: '10px', marginRight: '10px', float: 'right' }}
              >
                Create
              </Button>
              <div style={{ width: '21%', marginLeft: '37%' }}>
                {submitAss &&
                  toast.success('Assessment Created Successfully', {
                    duration: 2000
                  })}
              </div>
            </form>
          )}
        </Formik>
      </Card>
    </>
  )
}
export default CreateAssessmentForm
