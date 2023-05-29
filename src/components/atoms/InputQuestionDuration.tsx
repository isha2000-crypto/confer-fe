import React from 'react'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { minutesToSeconds, secondsToMinutes } from 'src/utils/unitConversion'
import { FormControl } from '@mui/material'

interface InputQuestionDurationProps {
  value: number
  onChange: (value: number) => void
  disabled: any
  admin_duration: number
  isReadOnly: any
  error?: string | null
  helperText: string
}

const InputQuestionDuration = (props: InputQuestionDurationProps) => {
  const { value, onChange, error = null, helperText } = props

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value)
    onChange(minutesToSeconds(newValue))
  }

  return (
    <FormControl>
      <TextField
        label='Duration'
        placeholder='Time to complete (in seconds)'
        value={secondsToMinutes(value)}
        disabled={props.isReadOnly}
        onChange={handleInputChange}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
    </FormControl>
  )
}

export default InputQuestionDuration
