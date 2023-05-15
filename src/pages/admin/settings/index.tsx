import { useState } from 'react'
import { SUBJECTS, ACTIONS } from '@custom-types/enum'
import { TextField, Typography, Card, CardContent, CardHeader, Button } from '@mui/material'
import { useMutation } from '@apollo/client'
import { UPDATE_ASSESSMENT_DURATION } from 'src/lib/graphql/Mutation'
import { useAuth } from 'src/hooks/useAuth'

function AdminSettings() {
  const [maxDuration, setMaxDuration] = useState('')
  const [updateAssessmentDuration] = useMutation(UPDATE_ASSESSMENT_DURATION)
  const auth = useAuth()

  const handleMaxDurationChange = (event: any) => {
    setMaxDuration(event.target.value)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    console.log('Hello i am saved duration')
    console.log('userhere', auth.user?.id)
    console.log('user name', auth.user?.name)
    updateAssessmentDuration({
      variables: {
        updateOrganizationId: String(auth.user?.id),
        updateOrganizationInput: { assessment_duration: parseInt(maxDuration, 10) }
      }
    })
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
        <Button variant='contained' type='submit' sx={{ float: 'right', marginLeft: '1000px' }} onClick={handleSubmit}>
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
