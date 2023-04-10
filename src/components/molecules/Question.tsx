// // ** MUI Imports
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

// import Delete from '@mui/material/Delete'

import { Task_Types } from '../../custom-types/enum'

import { useState } from 'react'
import Icon from 'src/@core/components/icon'

interface QuestionProps {
  id: number
  count: number
  handleQuestionUpdate: (index: number, question: any) => void
  removeQuestion: (id: number) => void
}

const Question = (props: QuestionProps) => {
  const [questionData, setQuestionData] = useState({
    type: '',
    duration: '',
    description: ''
  })
  const [isHoveredBin, setIsHoveredBin] = useState(false)
  const [isHoveredTick, setIsHoveredTick] = useState(false)

  // onst handleQuestionDataChange = (event) => {
  //   const { name, value } = event.target;
  //   setQuestionData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const handleQuestionDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setQuestionData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  // const handleQuestionUpdate = () => {
  //   props.onQuestionUpdate(props.count - 1, questionData)
  // }

  const handleAddQuestion = () => {
    props.handleQuestionUpdate(props.count - 1, questionData)
    setQuestionData({
      type: '',
      duration: '',
      description: ''
    })
  }
  const handleRemove = () => {
    props.removeQuestion(props.id)
  }
  const handleHover = event => {
    setIsHoveredBin(event.type === 'mouseenter')
  }
  const handleHoverTick = event => {
    setIsHoveredTick(event.type === 'mouseenter')
  }
  console.log('data', questionData)

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '10vh',
          marginTop: '0px',
          marginLeft: '220px',

          // border: '1px dotted #00b4a2',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.25)'
        }}
      >
        {/* <CardHeader title={`Question ${props.count}`} /> */}
        <Divider sx={{ m: '0 !important' }} />

        <form onSubmit={e => e.preventDefault()}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Icon icon='mdi-comment-outline' />

                {` ${props.count}.`}
                <br />
                <FormControl fullWidth variant='standard'>
                  <InputLabel id='task-type-select-label'>Select task type</InputLabel>
                  <Select
                    labelId='task-type-select-label'
                    id='task-type-select'
                    label='Select task type'
                    name='type'
                    value={questionData.type}
                    onChange={handleQuestionDataChange}
                  >
                    <MenuItem value='communication'>{Task_Types.COMMUNICATION}</MenuItem>
                    <MenuItem value='leadership'>{Task_Types.LEADERSHIP}</MenuItem>
                    <MenuItem value='programming'>{Task_Types.PROGRAMMING}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Description'
                  fullWidth
                  multiline
                  rows={4}
                  placeholder='Description here'
                  name='description'
                  value={questionData.description}
                  onChange={handleQuestionDataChange}
                  sx={{ bgcolor: '#ffffff', mt: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Duration'
                  type='number'
                  placeholder='Time to complete (in seconds)'
                  InputProps={{
                    endAdornment: (
                      <Typography variant='body2' sx={{ fontWeight: 600 }}>
                        seconds
                      </Typography>
                    )
                  }}
                  name='duration'
                  value={questionData.duration}
                  onChange={handleQuestionDataChange}
                  sx={{ bgcolor: '#ffffff', mt: 2 }}
                />
              </Grid>
            </Grid>
          </CardContent>

          {/* <Button onClick={handleAddQuestion}> save</Button> */}
          <span> </span>
          {/* <Button onClick={handleRemove}> Remove</Button> */}
          <span style={{ paddingLeft: '75%' }}>
            {' '}
            <Icon
              icon='mdi-check'
              style={{ marginLeft: '100px' }}
              onClick={handleAddQuestion}
              className={isHoveredTick ? 'green-icon' : ''}
              onMouseEnter={handleHoverTick}
              onMouseLeave={handleHoverTick}
            />
            &nbsp; &nbsp;
            <Icon
              icon='mdi-cup-off'
              onClick={handleRemove}
              className={isHoveredBin ? 'red-icon' : ''}
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
            />
          </span>
        </form>
      </div>
    </>
  )
}

export default Question
