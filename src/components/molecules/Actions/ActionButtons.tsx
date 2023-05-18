import { Box, Button } from '@mui/material'
import React from 'react'

interface Props {
  loading: boolean
  submit?: () => void
  handleCancel: () => void
  submitText: string
}

const ActionButtons = ({ loading, submit, handleCancel, submitText }: Props) => {
  return (
    <Box className='demo-space-x' sx={{ display: 'flex', justifyContent: 'end', alignItems: 'flex-end' }}>
      <Button size='large' type='submit' variant='contained' onClick={submit} disabled={loading}>
        {loading ? 'Loading...' : submitText}
      </Button>
      <Button size='large' color='secondary' variant='outlined' onClick={handleCancel} disabled={loading}>
        Cancel
      </Button>
    </Box>
  )
}

export default ActionButtons
