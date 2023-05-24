import { useState, useEffect } from 'react'
import { Formik } from 'formik'
import { validationSchema } from '../../../lib/schema/validationSchema'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import CreateQuestion from '../../molecules/CreateQuestion/CreateQuestion'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { Task_Types } from '../../../custom-types/enum'

import { useMutation } from '@apollo/client'
import { CREATE_ASSESSMENT_MUTATION, UPDATE_ASSESSMENT_MUTATION } from 'src/lib/graphql/Mutation'
import toast from 'react-hot-toast'
import { TransitionGroup } from 'react-transition-group'
import { Collapse } from '@mui/material'
import { useRouter } from 'next/router'

interface Question {
  id: number
  type: string
  description: string
  duration: number
}
interface Props {
  viewAssessment?: any
  isReadOnly?: boolean
  isEdit: any
  assessmentId: any
  initialAssessment: any
}

const AssessmentForm = ({ isEdit, assessmentId, initialAssessment, isReadOnly, viewAssessment }: Props) => {
  const [questions, setQuestions] = useState<Question[]>(initialAssessment?.tasks || [])

  const [submitAss, setSubmit] = useState(false)
  const [editAss, setEdit] = useState(false)

  const [createAssessmentMutation] = useMutation(CREATE_ASSESSMENT_MUTATION)
  const [updateAssessmentMutation] = useMutation(UPDATE_ASSESSMENT_MUTATION)
  const [assessment, setAssessment] = useState({
    title: isEdit ? initialAssessment.title : '',
    description: isEdit ? initialAssessment.description : '',
    type: isEdit ? initialAssessment.type : ''
  })
  console.log('from create ass id', assessmentId)
  const containerStyle = {
    backgroundColor: 'background.default',
    borderRadius: '20px',
    padding: '20px',
    margin: '20px 0',
    marginLeft: '20px',
    visibility: questions?.length ? 'visible' : 'hidden'
  }
  useEffect(() => {
    if (isReadOnly) {
      setQuestions(viewAssessment?.tasks || [])
    } else if (isEdit) {
      setQuestions(initialAssessment?.tasks || [])
    }
  }, [isReadOnly, isEdit, initialAssessment, viewAssessment])
  const addQuestion = () => {
    const newQuestion: Question = {
      id: questions.length + 1,
      type: 'TEXTUAL',
      description: '',
      duration: 1
    }
    setQuestions([...questions, newQuestion])
  }

  const removeQuestion = (index: number) => {
    if (isReadOnly) {
      toast.error('You cannot remove the task !')
    } else {
      const updatedQuestions = [...questions]
      updatedQuestions.splice(index, 1)
      setQuestions([...updatedQuestions])
    }
  }

  const handleQuestionUpdate = (index: number, name: string, value: string | number) => {
    if (isReadOnly) {
      toast('You cannot edit')
    } else {
      const updateQuestions: any = [...questions]
      if (name === 'duration') {
        value = Number(value) * 60
      }
      updateQuestions[index][name] = value
      setQuestions([...updateQuestions])
    }
  }

  const handleAssessmentSubmit = (event: any) => {
    event.preventDefault()
    let isFormValid = true
    if (questions.length === 0 || assessment.title === '' || assessment.description === '' || assessment.type === '') {
      toast('Minimum one question is required!')

      return
    }

    const modifiedQuestions = questions.map(question => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = question
      console.log('duration', question.duration)
      if (question.type === '' || question.description === '' || question.duration < 1) {
        alert('Please Make Sure Question Fields are Valid!!')
        isFormValid = false
      }

      return rest
    })

    if (!isFormValid) {
      console.log('Form is Not valid')

      return
    }
    if (isEdit) {
      updateAssessmentMutation({
        variables: {
          updateAssessmentId: assessmentId,
          updateAssessmentInput: {
            ...assessment,
            tasks: modifiedQuestions.map(question => ({
              type: question.type,
              description: question.description,
              duration: question.duration
            }))
          }
        }
      })
        .then(result => {
          console.log(result.data)
          setEdit(true)
          setTimeout(() => {
            resetForm()
          }, 2000)
        })
        .catch(error => {
          console.error(error)
        })
    } else {
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
  }
  const resetForm = () => {
    setAssessment({
      title: '',
      description: '',
      type: ''
    })
    setQuestions([])
    setSubmit(false)
  }
  const router = useRouter()
  const EditAssessment = () => {
    const assessmentId = viewAssessment?._id

    router.push(`/assessments/${assessmentId}/edit`)
  }

  return (
    <>
      <Card>
        {isReadOnly && (
          <Button
            size='large'
            type='submit'
            variant='contained'
            sx={{ width: '10%', marginTop: '10px', marginBottom: '0px', marginRight: '10px', float: 'right' }}
            onClick={EditAssessment}
          >
            {' '}
            Edit
          </Button>
        )}
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
              <h3 style={{ paddingLeft: '25px', paddingTop: '10px' }}>
                {isReadOnly ? 'Show Assessment' : 'Create Assessment'}
              </h3>

              <CardContent>
                <Grid container spacing={5} columns={1}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type='title'
                      label='Title'
                      name='title'
                      placeholder='Task'
                      value={
                        isReadOnly
                          ? viewAssessment.title
                          : assessment.title || isEdit
                          ? assessment.title
                          : formik.values.title
                      }
                      onChange={event => {
                        {
                          !isReadOnly && setAssessment({ ...assessment, title: event.target.value })
                          formik.handleChange(event)
                          if (!isEdit) {
                            formik.handleChange(event)
                          }
                          setAssessment({ ...assessment, title: event.target.value })
                        }
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
                        value={
                          isReadOnly
                            ? viewAssessment.description
                            : assessment.description || isEdit
                            ? assessment.description
                            : formik.values.description
                        }
                        onChange={event => {
                          if (!isEdit) {
                            formik.handleChange(event)
                          }
                          setAssessment({ ...assessment, description: event.target.value })
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
                          value={
                            isReadOnly
                              ? viewAssessment.type
                              : formik.values.type || isEdit
                              ? assessment.type
                              : formik.values.type
                          }
                          onChange={event => {
                            if (!isEdit) {
                              formik.handleChange(event)
                            }
                            setAssessment({ ...assessment, type: event.target.value })
                          }}
                          error={formik.touched.type && Boolean(formik.errors.type)}
                          required
                        >
                          <MenuItem value='CODING'>{Task_Types.CODING}</MenuItem>
                          <MenuItem value='LEADERSHIP'>{Task_Types.LEADERSHIP}</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </Grid>

                  <Grid container sx={containerStyle} spacing={5} justifyContent={'center'}>
                    <TransitionGroup>
                      {questions?.map((q, index) => (
                        <Collapse key={index}>
                          <CreateQuestion
                            count={index}
                            {...q}
                            removeQuestion={removeQuestion}
                            handleQuestionUpdate={handleQuestionUpdate}
                          />
                        </Collapse>
                      ))}
                    </TransitionGroup>
                  </Grid>

                  <Divider sx={{ mb: '0 !important' }} />

                  {!isReadOnly && (
                    <Grid item container justifyContent='center'>
                      <Button
                        onClick={addQuestion}
                        className='add-question-button'
                        sx={{
                          width: '100%',
                          fontSize: '1.5rem',
                          padding: '1rem',
                          borderRadius: '0.5rem',
                          transition: 'all 0.3s ease',
                          border: '2px dashed',
                          borderColor: 'text.primary',
                          color: 'text.primary'
                        }}
                      >
                        Add Question
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
              <Divider sx={{ m: '0 !important' }} />
              <div>
                {!isReadOnly && (
                  <Button
                    size='large'
                    type='submit'
                    variant='contained'
                    sx={{ width: '10%', marginTop: '10px', marginBottom: '10px', marginRight: '10px', float: 'right' }}
                  >
                    {isEdit ? 'Edit' : 'Create'}
                  </Button>
                )}
              </div>

              <div style={{ width: '21%', marginLeft: '37%' }}>
                {submitAss &&
                  toast.success('Assessment Created Successfully', {
                    duration: 2000
                  })}
              </div>
              <div style={{ width: '21%', marginLeft: '37%' }}>
                {editAss &&
                  toast.success('Assessment updated Successfully', {
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
export default AssessmentForm
