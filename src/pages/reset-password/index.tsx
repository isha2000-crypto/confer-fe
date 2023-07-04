// ** React Imports
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

// ** Next Import

// ** MUI Components
import Button from '@mui/material/Button'

import Box from '@mui/material/Box'

import { RESET_PASSWORD, VERIFY_TOKEN } from 'src/lib/graphql/Mutation'
import { useMutation } from '@apollo/client'

import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'

// ** Icon Imports
import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material'

// ** Formik validation schema
const validationSchema = Yup.object({
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
})

const ResetPassword = () => {
  // ** Hooks
  const [reset, setReset] = useState(false)
  const [resetPasswordMutation] = useMutation(RESET_PASSWORD)
  const router = useRouter()
  const { token } = router.query
  console.log('Token for test', token)
  const [resetToken, { loading, error }] = useMutation(VERIFY_TOKEN)

  useEffect(() => {
    if (token) {
      resetToken({ variables: { token } })
        .then(result => {
          console.log('succeeded', result)
        })
        .catch(error => {
          toast.error(error.message)
        })
    }
  }, [token, resetToken])

  const handleSubmit = (values: any) => {
    setReset(true)
    resetPasswordMutation({
      variables: {
        newPassword: values.password,
        token: token
      }
    })
      .then(result => {
        console.log('Password changed successfully', result)
      })
      .catch(error => {
        console.error('Password change failed', error)
      })
      .finally(() => {
        setReset(false)
        router.push('/login')
      })
  }

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  })

  const handleClickShowPassword = () => {
    formik.setFieldValue('password', !formik.values.password)
  }

  const handleClickConfirmPassShow = () => {
    formik.setFieldValue('confirmPassword', !formik.values.password)
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  return (
    <Card>
      <CardHeader title='Reset Password' />
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <FormControl fullWidth error={formik.touched.password && formik.errors.password}>
                <InputLabel htmlFor='form-layouts-basic-password'>Password</InputLabel>
                <OutlinedInput
                  disabled={reset}
                  label='Password'
                  id='form-layouts-basic-password'
                  {...formik.getFieldProps('password')}
                  type={formik.values.password ? 'text' : 'password'}
                  aria-describedby='form-layouts-basic-password-helper'
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        <Icon icon={formik.values.password ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText id='form-layouts-basic-password-helper'>
                  {formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : 'Use 8 or more characters with a mix of letters, numbers & symbols'}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={formik.touched.confirmPassword && formik.errors.confirmPassword}>
                <InputLabel htmlFor='form-layouts-confirm-password'>Confirm Password</InputLabel>
                <OutlinedInput
                  disabled={reset}
                  label='Confirm Password'
                  id='form-layouts-confirm-password'
                  {...formik.getFieldProps('confirmPassword')}
                  type={formik.values.password ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickConfirmPassShow}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        <Icon icon={formik.values.password ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText id='form-layouts-confirm-password-helper'>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword
                    ? formik.errors.confirmPassword
                    : 'Make sure to type the same password as above'}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Button size='large' type='submit' disabled={reset} variant='contained'>
                  {reset ? <CircularProgress size={24} /> : 'Change Password'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

ResetPassword.guestGuard = true

export default ResetPassword
