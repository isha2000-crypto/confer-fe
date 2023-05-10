import { useState } from 'react'
import { SUBJECTS, ACTIONS } from '@custom-types/enum'
import { TextField, Typography, Card, CardContent, CardHeader, Button } from '@mui/material'

function AdminSettings() {
  const [maxDuration, setMaxDuration] = useState('')

  const handleMaxDurationChange = (event: any) => {
    setMaxDuration(event.target.value)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    console.log('Hello i am saved duration')
  }

  return (
    <Card>
      <CardHeader title='Setting' />
      <CardContent sx={{ display: 'flex', width: '100%' }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label='Max Duration'
            type='number'
            placeholder='Time to complete (in seconds)'
            required
            onWheel={event => event.target.blur()}
            InputProps={{
              endAdornment: (
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  minutes
                </Typography>
              )
            }}
            name='max duration'
            onChange={handleMaxDurationChange}
            value={maxDuration}
          />
        </form>
        <Button variant='contained' type='submit' sx={{ float: 'right', marginLeft: '1000px' }}>
          Add{' '}
        </Button>
      </CardContent>
    </Card>
  )
}
AdminSettings.acl = {
  action: ACTIONS.READ,
  subject: SUBJECTS.ROLES
}

export default AdminSettings
