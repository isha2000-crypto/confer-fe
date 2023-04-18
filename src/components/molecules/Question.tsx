import Grid from '@mui/material/Grid'

import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Icon from 'src/@core/components/icon'
import { Question_Types } from '../../custom-types/enum'
import { memo } from 'react'
import styles from './Questions.module.scss'

interface QuestionProps {
  id: number
  type: string
  description: string
  duration: number
  count: number
  handleQuestionUpdate: (index: number, name: string, value: string | number) => void
  removeQuestion: (id: number) => void
}

const Question = (props: QuestionProps) => {
  const handleQuestionDataChange = (event: any) => {
    const { name, value } = event.target
    let intValue: string | number = value
    if (name === 'duration') {
      intValue = parseInt(value)
      if (intValue < 0) {
        intValue = 0
      }
    }
    props.handleQuestionUpdate(props.count, name, intValue)
  }

  const handleRemove = () => {
    props.removeQuestion(props.count)
  }

  const val = Number(props.duration)

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

          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.25)'
        }}
      >
        <CardContent>
          <Grid container spacing={2} sx={{ width: '100%' }}>
            <Grid item xs={12} sm={6}>
              <Typography variant='h6' className={styles.questionTitle} sx={{ marginTop: '15px' }}>
                Question {props.count + 1}
              </Typography>
              <FormControl fullWidth variant='standard'>
                <InputLabel id='task-type-select-label'>Select task type</InputLabel>
                <Select
                  labelId='task-type-select-label'
                  id='task-type-select'
                  label='Select task type'
                  name='type'
                  value={props.type}
                  onChange={handleQuestionDataChange}
                >
                  <MenuItem value='TEXTUAL'>{Question_Types.TEXTUAL}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <br />
            <Grid item xs={12} sx={{ marginTop: '15px' }}>
              <TextField
                label='Description'
                fullWidth
                multiline
                rows={4}
                placeholder='Description here'
                name='description'
                value={props.description}
                onChange={handleQuestionDataChange}
              />
            </Grid>
            <br />
            <br />
            <Grid item xs={12} sm={6} sx={{ marginTop: '15px' }}>
              <TextField
                fullWidth
                label='Duration'
                type='number'
                placeholder='Time to complete (in seconds)'
                onWheel={e => e.preventDefault()}
                InputProps={{
                  endAdornment: (
                    <Typography variant='body2' sx={{ fontWeight: 600 }}>
                      seconds
                    </Typography>
                  )
                }}
                name='duration'
                value={val}
                onChange={handleQuestionDataChange}
                helperText='Minimum value should be 60 seconds'
              />
            </Grid>
          </Grid>
          <br />
          <div style={{ paddingLeft: '90%' }}>
            <Icon icon='mdi-cup-off' onClick={handleRemove} className={styles.red_icon} />
          </div>
        </CardContent>
      </div>
    </>
  )
}

export default memo(Question)
