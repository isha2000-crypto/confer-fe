import * as React from 'react'
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Icon from 'src/@core/components/icon'
import IconButton from '@mui/material/IconButton'

function IconButtonTimeRemaining(
  props: CircularProgressProps & { timeRemaining: number; value: number; handleClick: any }
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant='determinate'
        {...props}
        sx={{
          width: '100px !important',
          height: '100px !important'
        }}
        color='error'
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <IconButton
          color={'error'}
          onClick={props.handleClick}
          sx={{
            background: 'rgba(204,204,204,0.4)',
            '&:hover': {
              backgroundColor: 'rgba(204,204,204,0.4)',
              transform: 'scale(1.2)'
            }
          }}
        >
          <Icon icon='mdi:stop' fontSize={60} />
        </IconButton>
      </Box>
    </Box>
  )
}

export default IconButtonTimeRemaining
