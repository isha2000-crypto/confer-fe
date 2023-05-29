import React from 'react'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { minutesToSeconds } from 'date-fns'

interface QuestionDurationInputProps {
  value: number
  onChange: (value: number) => void
  disabled: any
  admin_duration: number
  isReadOnly: any
  error?: string | null
  helperText: string
}

const QuestionDurationInput = (props: QuestionDurationInputProps) => {
  const { value, onChange, error = null, helperText } = props

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value)
    const seconds = minutesToSeconds(newValue)
    onChange(seconds)
  }

  return (
    <div>
      <TextField
        label='Duration'
        type='number'
        placeholder='Time to complete (in seconds)'
        value={value / 60}
        disabled={props.isReadOnly}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <Typography variant='body2' sx={{ fontWeight: 600 }}>
              minutes
            </Typography>
          )
        }}
        error={!!error}
        helperText={error ?? helperText}
      />
    </div>
  )
}

export default QuestionDurationInput
