import { useState } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import TextArea from '@mui/material/TextareaAutosize'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Question from '../../components/atoms/Question'

const FormLayoutsSeparator = () => {
  const [questions, setQuestions] = useState([])
  const [showQuestionForm, setShowQuestionForm] = useState(false)

  const handleQuestionForm = () => {
    setShowQuestionForm(!showQuestionForm)
  }

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      title: '',
      options: [''],
      correctOption: ''
    }
    setQuestions([...questions, newQuestion])
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
                <TextArea aria-label='minimum height' minRows={12} placeholder='Description here' />
              </div>
            </Grid>

            {questions.map(question => (
              <Grid item xs={12} key={question.id}>
                <Question question={question} />
              </Grid>
            ))}

            <Grid item xs={12}>
              <Divider sx={{ mb: '0 !important' }} />
              <Button onClick={addQuestion}> Add Question </Button>
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ m: '0 !important' }} />
      </form>
    </Card>
  )
}

export default FormLayoutsSeparator
