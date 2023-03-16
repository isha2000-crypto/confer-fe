import { Grid } from '@mui/material'
import React from 'react'
import GoogleButton from 'react-google-button'
import { CodeResponse, useGoogleLogin } from '@react-oauth/google'
import { ErrCallbackType } from '@custom-types/contextTypes'

const ButtonStyle: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '8px'
}

interface Props {
  handleLogin: (params: CodeResponse, errCallBack?: ErrCallbackType) => void
}
function ButtonGoogle({ handleLogin }: Props) {
  const login: any = useGoogleLogin({
    onSuccess: codeResponse => handleLogin(codeResponse),
    flow: 'auth-code'
  })

  return (
    <Grid container alignItems='center' justifyContent={'center'}>
      <GoogleButton type='light' onClick={login} style={ButtonStyle} />
    </Grid>
  )
}

export default ButtonGoogle
