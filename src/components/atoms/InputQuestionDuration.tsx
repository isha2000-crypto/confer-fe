import React from 'react'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { minutesToSeconds, secondsToMinutes } from 'src/utils/unitConversion'
import { FormControl } from '@mui/material'

interface InputQuestionDurationProps {
  value: number
  label?: string
  placeholder?: string
  onChange: (value: number) => void
  disabled?: boolean
  isReadOnly?: boolean
  error?: boolean | null
  helperText: string
}

const InputQuestionDuration = (props: InputQuestionDurationProps) => {
  const { value, onChange, error, helperText } = props
  console.log('Error', error)
  console.log('Helper Text', helperText)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value)
    onChange(minutesToSeconds(newValue))
  }

  return (
    <FormControl>
      <TextField
        label={props.label || 'Duration'}
        placeholder={props.placeholder || 'Time to complete (in seconds)'}
        value={secondsToMinutes(value)}
        disabled={props.isReadOnly || false}
        onChange={handleInputChange}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        InputProps={{
          endAdornment: (
            <Typography variant='body2' sx={{ fontWeight: 600 }}>
              minutes
            </Typography>
          )
        }}
        error={error || false}
        helperText={helperText}
      />
    </FormControl>
  )
}

export default InputQuestionDuration
