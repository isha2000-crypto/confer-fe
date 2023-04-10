import { Box, CircularProgress } from '@mui/material'
import React from 'react'

function ComponentSpinner() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: '0 auto',
        width: '100%'
      }}
    >
      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  )
}

export default ComponentSpinner
