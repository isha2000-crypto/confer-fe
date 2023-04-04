import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import CancelIcon from '@mui/icons-material/Cancel'

const Form = styled('form')(({ theme }) => ({
  maxWidth: 400,
  padding: theme.spacing(12),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`
}))

const InviteForm = () => {
  const [emails, setEmails] = useState([])
  const [inputValue, setInputValue] = useState('')

  const handleEmailsChange = event => {
    setInputValue(event.target.value)
  }
  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleAddEmail(event)
    }
  }

  // const handleAddEmail = event => {
  //   event.preventDefault()
  //   const newEmails = inputValue.split(' ').filter(email => email !== '')
  //   setEmails([...emails, ...newEmails])
  //   setInputValue('')
  // }
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
    console.log(emails)
  }
  const handleRemoveEmail = email => {
    setEmails(emails.filter(e => e !== email))
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
        <Button size='large' type='submit' variant='contained' sx={{ width: '100%' }}>
          Send Invite
        </Button>
      </Grid>
    </Form>
  )
}

export default InviteForm
