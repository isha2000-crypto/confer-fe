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

const Form = styled('form')(({ theme }) => ({
  maxWidth: 400,
  padding: theme.spacing(12),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`
}))

const InviteForm = () => {
  const [emails, setEmails] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [inviteSuccessCount, setInviteSuccessCount] = useState(0) // new state variable
  const [failedInvite, setFailedInvite] = useState([])
  const [loading, setLoading] = useState(false)
  const [inviteUserMutation] = useMutation(INVITE_USER_MUTATION)

  // const [inviteUserMutation, { loading }] = useMutation(INVITE_USER_MUTATION)

  const handleEmailsChange = event => {
    setInputValue(event.target.value)
  }
  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleAddEmail(event)
    }
  }

  const handleAddEmail = event => {
    event.preventDefault()
    const newEmails = inputValue.split(' ').filter(email => email !== '')

    // Email regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const validEmails = newEmails.filter(email => emailPattern.test(email))

    setEmails([...emails, ...validEmails])
    setInputValue('')
  }

  const handleSubmit = event => {
    event.preventDefault()

    // console.log(emails)
  }
  const handleRemoveEmail = email => {
    setEmails(emails.filter(e => e !== email))
  }
  const handleInvite = () => {
    setLoading(true)
    inviteUserMutation({
      variables: { usersInvitationInput: { emails } }
    })
      .then(result => {
        console.log(result.data)

        // console.log('success count', result.data.length)
        setInviteSuccessCount(result.data.inviteUsers.sent.length)
        setFailedInvite(result.data.inviteUsers.failed)
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const handleClear = () => {
    setEmails([])
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
            label={email}
            onDelete={() => handleRemoveEmail(email)}
            deleteIcon={<CancelIcon />}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Grid>
      <br />
      <Grid item xs={12}>
        <Button size='large' type='submit' variant='contained' sx={{ width: '100%' }} onClick={handleInvite}>
          {loading ? <CircularProgress size={24} /> : 'Send Invite'}
        </Button>
        {inviteSuccessCount > 0 && (
          <Typography variant='body2' color='success'>
            {inviteSuccessCount} invite{inviteSuccessCount > 1 && 's'} sent successfully
          </Typography>
        )}
        {inviteSuccessCount < 0 && (
          <div>
            {failedInvite} to these emails invite not sent
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
