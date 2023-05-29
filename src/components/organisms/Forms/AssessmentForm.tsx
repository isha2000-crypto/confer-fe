import { useState, useEffect, useContext } from 'react'
import { Formik, FieldArray, useFormikContext } from 'formik'

import { assessmentValidationSchema } from '../../../lib/schema/validationSchema'

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
import FormHelperText from '@mui/material/FormHelperText'
import { ACTIONS, SUBJECTS, Task_Types } from '../../../custom-types/enum'

import { useMutation } from '@apollo/client'
import { CREATE_ASSESSMENT_MUTATION, UPDATE_ASSESSMENT_MUTATION } from 'src/lib/graphql/Mutation'
import toast from 'react-hot-toast'

import { useRouter } from 'next/router'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { minutesToSeconds } from 'src/utils/unitConversion'

interface Question {
  id: number
  type: string
  description: string
  duration: number
}
interface Props {
  isReadOnly?: boolean
  isEdit?: any
  assessmentId?: any
  initialAssessment?: any
}

const AssessmentForm = ({ isEdit, assessmentId, initialAssessment, isReadOnly }: Props) => {
  const ability = useContext(AbilityContext)
  const [initialQuestions, setInitialQuestions] = useState<Question[]>(initialAssessment?.tasks || [])
  const [createAssessmentMutation] = useMutation(CREATE_ASSESSMENT_MUTATION)
  const [updateAssessmentMutation] = useMutation(UPDATE_ASSESSMENT_MUTATION)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [assessment, setAssessment] = useState({
    title: isEdit || isReadOnly ? initialAssessment.title : '',
    description: isEdit || isReadOnly ? initialAssessment.description : '',
    type: isEdit || isReadOnly ? initialAssessment.type : ''
  })
  const formikContext = useFormikContext()

  useEffect(() => {
    if (isReadOnly) {
      setInitialQuestions(initialAssessment?.tasks || [])
    } else if (isEdit) {
      setInitialQuestions(initialAssessment?.tasks || [])
    }
  }, [isReadOnly, isEdit, initialAssessment])

  useEffect(() => {
    if (!isReadOnly && !isEdit && initialQuestions.length === 0) {
      const arrayHelpers = formikContext?.getFieldHelpers('questions')
      addQuestion(arrayHelpers)
    }
  }, [isReadOnly, isEdit, initialQuestions.length])

  const addQuestion = (arrayHelpers: any) => {
    const newQuestion: Question = {
      id: arrayHelpers?.form?.values?.questions?.length + 1,
      type: 'TEXTUAL',
      description: '',
      duration: 0
    }
    arrayHelpers?.push(newQuestion)
  }

  const removeQuestion = (arrayHelpers: any, index: any) => {
    if (isReadOnly) {
      toast.error('You cannot remove the task!')
    } else {
      arrayHelpers?.remove(index)
    }
  }

  const handleQuestionUpdate = (formik: any, index: any, name: any, value: any) => {
    if (isReadOnly) {
      toast('You cannot edit')
    } else {
      const { questions } = formik.values
      const updateQuestions = [...questions]
      if (name === 'duration') {
        const minutes = Number(value)
        const seconds = minutesToSeconds(minutes)
        value = seconds
      }

      updateQuestions[index][name] = value
      formik.setFieldValue('questions', updateQuestions)
    }
  }

  const handleAssessmentSubmit = (values: any, { resetForm }: any) => {
    let isFormValid = true
    const { questions, ...rest } = values
    const modifiedQuestions = questions.map((question: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = question
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
            ...rest,
            tasks: modifiedQuestions.map((question: any) => ({
              type: question?.type,
              description: question?.description,
              duration: question?.duration
            }))
          }
        }
      })
        .then(result => {
          console.log(result.data)
          toast.success('Assessment updated Successfully', {
            duration: 2000
          })
        })
        .catch(error => {
          console.error(error)
        })
    } else {
      createAssessmentMutation({
        variables: { createAssessmentInput: { ...rest, tasks: modifiedQuestions } }
      })
        .then(result => {
          console.log(result.data)

          resetForm()
          toast.success('Assessment Created Successfully', {
            duration: 2000
          })
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  const router = useRouter()
  const EditAssessment = () => {
    const assessmentId = initialAssessment?._id

    router.push(`/assessments/${assessmentId}/edit`)
  }

  return (
    <>
      <Card>
        {isReadOnly && ability.can(ACTIONS.UPDATE, SUBJECTS.ASSESSMENT) && (
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
            title: assessment.title,
            description: assessment.description,
            type: assessment.type,
            questions: initialQuestions.map(question => ({
              ...question,
              duration: question.duration
            }))
          }}
          validationSchema={assessmentValidationSchema}
          onSubmit={handleAssessmentSubmit}
          enableReinitialize
        >
          {formik => (
            <form onSubmit={formik.handleSubmit}>
              <h3 style={{ paddingLeft: '25px', paddingTop: '10px' }}>
                {isReadOnly ? 'Assessment Details' : isEdit ? 'Edit Assessment' : 'Create Assessment'}
              </h3>

              <CardContent>
                <Grid container spacing={5} columns={1}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type='title'
                      label='Title'
                      name='title'
                      placeholder='Task'
                      disabled={isReadOnly}
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      error={formik.touched.title && Boolean(formik.errors.title)}
                      helperText={formik.touched.title && formik.errors.title ? String(formik.errors.title) : ''}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '15px' }}>
                      <TextField
                        fullWidth
                        multiline
                        label='Description'
                        name='description'
                        disabled={isReadOnly}
                        rows={4}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={
                          formik.touched.description && formik.errors.description
                            ? String(formik.errors.description)
                            : ''
                        }
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
                          disabled={isReadOnly}
                          value={formik.values.type}
                          onChange={formik.handleChange}
                          error={formik.touched.type && Boolean(formik.errors.type)}
                        >
                          <MenuItem value='CODING'>{Task_Types.CODING}</MenuItem>
                          <MenuItem value='LEADERSHIP'>{Task_Types.LEADERSHIP}</MenuItem>
                        </Select>
                        <FormHelperText error={formik.touched.type && Boolean(formik.errors.type)}>
                          {formik.touched.type && String(formik.errors.type)}
                        </FormHelperText>
                      </FormControl>
                    </div>
                  </Grid>
                  <Divider sx={{ mb: '0 !important' }} />
                  <Grid item container justifyContent='center'>
                    <FieldArray name='questions'>
                      {arrayHelpers => (
                        <>
                          <Grid justifyContent='center'>
                            {arrayHelpers.form.values.questions.length > 0 &&
                              arrayHelpers.form.values.questions.map((question: any, index: any) => (
                                <CreateQuestion
                                  key={index}
                                  formik={arrayHelpers.form}
                                  count={index}
                                  index={index}
                                  {...question}
                                  removeQuestion={() => removeQuestion(arrayHelpers, index)}
                                  handleQuestionUpdate={(name, value) =>
                                    handleQuestionUpdate(arrayHelpers.form, index, name, value)
                                  }
                                  isReadOnly={isReadOnly}
                                />
                              ))}
                          </Grid>

                          {!isReadOnly && (
                            <Button
                              onClick={() => addQuestion(arrayHelpers)}
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
                          )}
                        </>
                      )}
                    </FieldArray>
                  </Grid>
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
            </form>
          )}
        </Formik>
      </Card>
    </>
  )
}
export default AssessmentForm
