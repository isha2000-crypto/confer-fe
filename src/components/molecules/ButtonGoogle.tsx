import { Grid } from '@mui/material'
import React from 'react'
import GoogleButton from 'react-google-button'
import { useGoogleLogin } from '@react-oauth/google'

const ButtonStyle: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '8px'
}
function ButtonGoogle() {
  const login: any = useGoogleLogin({
    onSuccess: codeResponse => console.log(codeResponse),
    flow: 'auth-code'
  })

  return (
    <Grid container alignItems='center' justifyContent={'center'}>
      <GoogleButton type='light' onClick={login} style={ButtonStyle} />
    </Grid>
  )
}

export default ButtonGoogle
