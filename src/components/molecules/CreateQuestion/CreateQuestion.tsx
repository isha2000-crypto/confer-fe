import Grid from '@mui/material/Grid'

import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Icon from 'src/@core/components/icon'
import { Question_Types } from '../../../custom-types/enum'
import { memo } from 'react'
import styles from './CreateQuestions.module.scss'

interface QuestionProps {
  id: number
  type: string
  description: string
  duration: number
  count: number
  isReadOnly?: boolean
  handleQuestionUpdate: (index: number, name: string, value: string | number) => void
  removeQuestion: (id: number) => void
}

const CreateQuestion = (props: QuestionProps) => {
  const handleQuestionDataChange = (event: any) => {
    const { name, value } = event.target
    let intValue: string | number = value
    if (name === 'duration') {
      intValue = parseInt(value) / 60

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
      <Grid
        container
        xs={12}
        sx={{
          padding: '20px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.25)',
          borderRadius: '20px',
          backgroundColor: 'background.paper',
          marginBottom: '20px'
        }}
      >
        <Grid item xs={12} sm={12}>
          <Typography variant='h6' className={styles.questionTitle} sx={{ marginTop: '15px', marginBottom: '15px' }}>
            Question {props.count + 1}
          </Typography>
          <FormControl fullWidth variant='outlined'>
            <InputLabel id='task-type-select-label'>Select task type</InputLabel>
            <Select
              labelId='task-type-select-label'
              id='task-type-select'
              label='Select task type'
              name='type'
              value={props.type}
              onChange={handleQuestionDataChange}
              disabled={props.isReadOnly}
              required
            >
              <MenuItem value='TEXTUAL'>{Question_Types.TEXTUAL}</MenuItem>
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
            value={props.description}
            onChange={handleQuestionDataChange}
            required
            disabled={props.isReadOnly}
            sx={{ marginTop: '15px' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Duration'
            type='number'
            placeholder='Time to complete (in seconds)'
            required
            onWheel={e => e.preventDefault()}
            disabled={props.isReadOnly}
            InputProps={{
              endAdornment: (
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  minutes
                </Typography>
              )
            }}
            name='duration'
            value={val}
            onChange={handleQuestionDataChange}
            helperText='Minimum value should be 1 minute'
            sx={{ marginTop: '15px' }}
          />
        </Grid>
        {!props.isReadOnly && (
          <div style={{ paddingLeft: '90%' }}>
            <Icon icon='mdi-cup-off' onClick={handleRemove} className={styles.red_icon} />
          </div>
        )}
      </Grid>
    </>
  )
}

export default memo(CreateQuestion)
