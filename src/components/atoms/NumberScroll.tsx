import { Grid, TextField, Typography } from '@mui/material'

const NumberScroll = () => {
  ;<Grid item xs={12} sm={6}>
    <TextField
      fullWidth
      label='Duration'
      type='number'
      placeholder='Time to complete (in seconds)'
      required
      onWheel={e => e.preventDefault()}
      InputProps={{
        endAdornment: (
          <Typography variant='body2' sx={{ fontWeight: 600 }}>
            seconds
          </Typography>
        )
      }}
      name='duration'
      helperText='Minimum value should be 60 seconds'
      sx={{ marginTop: '15px' }}
    />
  </Grid>
}

export default NumberScroll
