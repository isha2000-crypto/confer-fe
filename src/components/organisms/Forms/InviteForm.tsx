import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import CancelIcon from '@mui/icons-material/Cancel'
import { useMutation } from '@apollo/client'
import { INVITE_USER_MUTATION } from 'src/lib/graphql/Mutation'
import CircularProgress from '@mui/material/CircularProgress'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import { Alert, FormControl } from '@mui/material'
import { useEffect } from 'react'

// ** Redux Imports
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { fetchRoles } from 'src/store/roles/rolesActions'
import { useRouter } from 'next/router'
import FallbackSpinner from 'src/@core/components/spinner'

const Form = styled('form')(({ theme }) => ({
  maxWidth: 400,
  padding: theme.spacing(12),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`
}))

const InviteForm = () => {
  const [emails, setEmails] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [inviteSuccessCount, setInviteSuccessCount] = useState(0) // new state variable
  const [failedInvite, setFailedInvite] = useState([])
  const [loading, setLoading] = useState(false)
  const [inviteUserMutation] = useMutation(INVITE_USER_MUTATION)
  const dispatch = useDispatch<AppDispatch>()
  const rolesStore = useSelector((store: RootState) => store.roles)
  const [userRole, setUserRole] = useState('user')

  useEffect(() => {
    dispatch(fetchRoles())
  }, [dispatch])

  const router = useRouter()
  if (rolesStore.loading) return <FallbackSpinner />
  if (rolesStore.error) router.push('/404')

  console.log(
    'roles here',
    rolesStore.roles.map(title => title.title)
  )

  const handleEmailsChange = (event: any) => {
    setInputValue(event.target.value)
  }
  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      handleAddEmail(event)
    }
  }

  const handleAddEmail = (event: any) => {
    event.preventDefault()
    const newEmails = inputValue.split(' ').filter(email => email !== '')

    // Email regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const validEmails = newEmails.filter(email => emailPattern.test(email))

    setEmails([...emails, ...validEmails])
    setInputValue('')
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
  }
  const handleRemoveEmail = (email: any) => {
    setEmails(emails.filter(e => e !== email))
  }
  const handleInvite = () => {
    setLoading(true)
    inviteUserMutation({
      variables: { usersInvitationInput: { emails } }
    })
      .then(result => {
        console.log(result.data)

        setInviteSuccessCount(result.data.inviteUsers.sent.length)
        setFailedInvite(result.data.inviteUsers.failed)
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {
        setLoading(false)
      })
    if (userRole == null) {
      console.log('Enter role')
    }
  }
  const handleClear = () => {
    setEmails([])
  }

  const handleRoleChange = (event: any) => {
    setUserRole(event.target.value)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography variant='h5'>Invitation</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Emails'
            multiline
            rows={4}
            placeholder='Enter emails separated by a single space'
            value={inputValue}
            onChange={handleEmailsChange}
            onKeyPress={handleKeyPress}
          />
        </Grid>
      </Grid>
      <br />
      <Grid item xs={12} md={4}>
        <FormControl fullWidth sx={{ alignSelf: 'center' }}>
          <InputLabel id='role-select-label'>Role</InputLabel>

          <Select
            labelId='role-select-label'
            id='role-select'
            value={userRole}
            onChange={handleRoleChange}
            label='Role'
            placeholder='Role'
          >
            {rolesStore.roles.map(role => (
              <MenuItem key={role.title} value='user'>
                {role.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <br />
      <Grid item xs={12}>
        <Button size='large' type='button' variant='contained' sx={{ width: '100%' }} onClick={handleAddEmail}>
          Add
        </Button>
      </Grid>
      <br />
      <Grid item xs={12}>
        {emails.map(email => (
          <Chip
            key={email}
            label={`(${userRole}) ${email}`}
            onDelete={() => handleRemoveEmail(email)}
            deleteIcon={<CancelIcon />}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Grid>
      <br />
      <Grid item xs={12}>
        <Button
          size='large'
          type='submit'
          variant='contained'
          sx={{ width: '100%' }}
          onClick={handleInvite}
          disabled={!userRole}
        >
          {loading ? <CircularProgress size={24} /> : 'Send Invite'}
        </Button>
        {!userRole && (
          <Typography color='error' variant='caption'>
            Please select a role before adding emails.
          </Typography>
        )}
        {inviteSuccessCount > 0 && (
          <Alert severity='success'>
            {inviteSuccessCount} invite{inviteSuccessCount > 1 && 's'} sent successfully
          </Alert>
        )}
        {inviteSuccessCount < 0 && (
          <div>
            <Alert severity='error'>{failedInvite} to these emails invite not sent</Alert>
            <Button size='large' type='submit' variant='contained' sx={{ width: '100%' }} onClick={handleInvite}>
              {' '}
              Retry
            </Button>{' '}
            <Button size='large' type='submit' variant='contained' sx={{ width: '100%' }} onClick={handleClear}>
              Clear
            </Button>
          </div>
        )}
      </Grid>
    </Form>
  )
}

export default InviteForm
