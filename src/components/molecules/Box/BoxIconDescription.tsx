import { Box, Typography } from '@mui/material'
import React from 'react'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Icon from 'src/@core/components/icon'

interface props {
  icon: string
  title: string
  description: string
}

function BoxIconDescription({ icon, title, description }: props) {
  return (
    <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
      <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3 }}>
        <Icon icon={icon} />
      </CustomAvatar>
      <div>
        <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
          {title}
        </Typography>
        <Typography variant='body2'>{description}</Typography>
      </div>
    </Box>
  )
}

export default BoxIconDescription
