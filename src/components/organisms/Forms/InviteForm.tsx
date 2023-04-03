// ** React Imports
import { ChangeEvent, MouseEvent, useState } from 'react'

// ** MUI Imports

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'

import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'

import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface State {
  password: string
  showPassword: boolean
}

// Styled component for the form
const Form = styled('form')(({ theme }) => ({
  maxWidth: 400,
  padding: theme.spacing(12),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`
}))

const FormLayoutsAlignment = () => {
  // ** State
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false
  })

  // Handle Password
  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Form onSubmit={e => e.preventDefault()}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography variant='h5'>Sign In</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label='Username' placeholder='carterLeonard' />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor='form-layouts-alignment-password'>Password</InputLabel>
            <OutlinedInput
              label='Password'
              value={values.password}
              onChange={handleChange('password')}
              id='form-layouts-alignment-password'
              type={values.showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    aria-label='toggle password visibility'
                  >
                    <Icon icon={values.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            label='Remember me'
            control={<Checkbox name='form-layouts-alignment-checkbox' />}
            sx={{ '& .MuiButtonBase-root': { pt: 0, pb: 0 } }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button size='large' type='submit' variant='contained' sx={{ width: '100%' }}>
            Login
          </Button>
        </Grid>
      </Grid>
    </Form>
  )
}

export default FormLayoutsAlignment
