import { useState, useEffect } from 'react'
import { SUBJECTS, ACTIONS } from '@custom-types/enum'
import { TextField, Typography, Card, CardContent, CardHeader, Button } from '@mui/material'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_ASSESSMENT_DURATION } from 'src/lib/graphql/Mutation'
import { useAuth } from 'src/hooks/useAuth'
import { LOAD_CURRENT_TENANT } from 'src/lib/graphql/Query'
import FallbackSpinner from 'src/@core/components/spinner'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

function AdminSettings() {
  const [updateAssessmentDuration] = useMutation(UPDATE_ASSESSMENT_DURATION)
  const auth = useAuth()
  const router = useRouter()
  const { error, loading, data } = useQuery(LOAD_CURRENT_TENANT)
  const [maxDuration, setMaxDuration] = useState('')

  const handleMaxDurationChange = (event: any) => {
    setMaxDuration(event.target.value)
  }

  useEffect(() => {
    if (data) {
      setMaxDuration(data?.currentTenant?.assessment_duration)
    }
  }, [data])

  const handleSubmit = (event: any) => {
    event.preventDefault()

    const duration = parseInt(maxDuration)

    if (duration >= 0) {
      updateAssessmentDuration({
        variables: {
          updateOrganizationId: auth.user?.tenantId,
          updateOrganizationInput: { assessment_duration: duration }
        }
      }).then(() => {
        toast.success('Duration added successfully!')
      })
    } else {
      toast.error('Invalid duration!')
    }
  }

  if (loading) {
    return <FallbackSpinner />
  }

  if (error) {
    router.push('/500')
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
            placeholder='Max Duration'
            onWheel={(event: any) => event.target.blur()}
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
            inputProps={{ min: '0' }}
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
