import { Box, Typography } from '@mui/material'
import React from 'react'

interface props {
  title: string
  description: string
}

function BoxTitleBold({ title, description }: props) {
  return (
    <Box sx={{ display: 'flex', mb: 2.7 }}>
      <Typography variant='subtitle2' sx={{ mr: 2, color: 'primary.main', fontWeight: 'bold' }}>
        {title}:
      </Typography>
      <Typography variant='body2'>{description}</Typography>
    </Box>
  )
}

export default BoxTitleBold
