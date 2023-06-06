import React, { useState } from 'react'
import { useFormik } from 'formik'
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
import { Alert, Card, FormControl } from '@mui/material'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { fetchRoles } from 'src/store/roles/rolesActions'
import { useRouter } from 'next/router'
import FallbackSpinner from 'src/@core/components/spinner'
import { InviteFormSchema } from 'src/lib/yup-schema/InviteFormSchema'
import { EmailWithRole } from '@custom-types/invite-form-types'

const CustomForm = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  padding: theme.spacing(12),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '& .MuiFormControl-root': {
    '& .MuiFormHelperText-root': {
      color: theme.palette.error.main
    }
  }
}))

const InviteForm = () => {
  const [inviteSuccessCount, setInviteSuccessCount] = useState(0)
  const [failedInvite, setFailedInvite] = useState([])
  const [inviteUserMutation] = useMutation(INVITE_USER_MUTATION)
  const dispatch = useDispatch<AppDispatch>()
  const rolesStore = useSelector((store: RootState) => store.roles)
  const [formSubmitting, setFormSubmitting] = useState(false)

  const handleInvite = (values: any) => {
    setFormSubmitting(true)

    // TODO: Add support form both emails and role IDs in mutation
    inviteUserMutation({
      variables: { usersInvitationInput: { emails: [...values.emails.map((item: EmailWithRole) => item.email)] } }
    })
      .then(result => {
        setInviteSuccessCount(result.data.inviteUsers.sent.length)
        setFailedInvite(result.data.inviteUsers.failed)
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {
        setFormSubmitting(false)
      })
  }

  useEffect(() => {
    dispatch(fetchRoles())
  }, [dispatch])

  const formik = useFormik({
    initialValues: {
      emailInput: '',
      emails: [],
      userRole: rolesStore.roles.length > 0 ? rolesStore.roles[0]._id : ''
    },
    validationSchema: InviteFormSchema,
    onSubmit: handleInvite
  })

  useEffect(() => {
    if (rolesStore.roles.length > 0) {
      formik.setFieldValue('userRole', rolesStore.roles[0]._id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rolesStore.roles])

  const router = useRouter()
  if (rolesStore.loading) return <FallbackSpinner />
  if (rolesStore.error) router.push('/404')

  const handleEmailsChange = (event: any) => {
    formik.setFieldValue('emailInput', event.target.value)
  }

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      handleAddEmail(event)
    }
  }

  const handleAddEmail = (event: any) => {
    event.preventDefault()

    const newEmails = formik.values?.emailInput?.split(' ').filter(email => email !== '')

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const validEmails = newEmails?.filter(email => emailPattern.test(email))
    const emailsWithRoles = validEmails.map(email => ({
      email: email,
      role: formik.values.userRole
    }))
    const uniqueEmails = [
      ...new Map([...formik.values?.emails, ...emailsWithRoles].map(item => [item['email'], item])).values()
    ]
    formik.setFieldValue('emails', [...uniqueEmails])
    formik.setFieldValue('emailInput', '')
  }

  const handleClear = () => {
    formik.setFieldValue('emails', [])
  }

  const handleRemoveEmail = (email: string) => {
    formik.setFieldValue(
      'emails',
      formik.values?.emails.filter((item: EmailWithRole) => item.email !== email)
    )
  }

  const getRoleLabel = (roleId: string) => {
    const roleItemIndex = rolesStore.roles.findIndex(item => item._id === roleId)

    return rolesStore.roles[roleItemIndex].title
  }

  return (
    <CustomForm>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography variant='h5'>Invitation</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Emails'
              multiline
              disabled={formSubmitting}
              rows={4}
              placeholder='Enter emails separated by a single space'
              name='emailInput'
              value={formik.values?.emailInput}
              onChange={event => handleEmailsChange(event)}
              onKeyPress={event => handleKeyPress(event)}
              error={
                (formik.touched.emailInput && Boolean(formik.errors.emailInput)) ||
                (formik.touched.emails && Boolean(formik.errors.emails))
              }
              helperText={
                (formik.touched.emailInput && formik.errors.emailInput) ||
                (formik.touched.emails && formik.errors.emails)
              }
            />
          </Grid>
        </Grid>
        <br />
        <Grid item xs={12} md={4}>
          <FormControl fullWidth sx={{ alignSelf: 'center' }}>
            <InputLabel id='role-select-label'>Role</InputLabel>
            {rolesStore.roles.length > 0 && (
              <Select
                labelId='role-select-label'
                id='role-select'
                name='userRole'
                disabled={formSubmitting || !formik.values?.emailInput?.trim()}
                value={formik.values.userRole}
                onChange={formik.handleChange}
                label='Role'
                placeholder='Role'
              >
                {rolesStore.roles.map(role => (
                  <MenuItem key={role._id} value={role._id}>
                    {role.title}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FormControl>
        </Grid>
        <br />
        <Grid item xs={12}>
          <Button
            size='large'
            type='button'
            variant='contained'
            sx={{ width: '100%' }}
            onClick={event => handleAddEmail(event)}
            disabled={!formik.values?.emailInput?.trim()}
          >
            Add
          </Button>
        </Grid>
        <br />
        <Grid item xs={12}>
          {formik.values.emails.map((item: EmailWithRole) => (
            <Chip
              key={item.email}
              label={`(${getRoleLabel(item.role)}) ${item.email}`}
              onDelete={() => handleRemoveEmail(item.email)}
              deleteIcon={<CancelIcon />}
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Grid>
        <br />
        <Grid item xs={12}>
          <Button size='large' type='submit' disabled={formSubmitting} variant='contained' sx={{ width: '100%' }}>
            {formSubmitting ? <CircularProgress size={24} /> : 'Send Invite'}
          </Button>
          {inviteSuccessCount > 0 && (
            <Alert severity='success' sx={{ marginTop: '10px' }}>
              {inviteSuccessCount} invite{inviteSuccessCount > 1 ? 's' : ''} sent successfully
            </Alert>
          )}
          {inviteSuccessCount < 0 && (
            <div>
              <Alert severity='error'>{failedInvite.length} to these emails invite not sent</Alert>
              <Button size='large' type='submit' variant='contained' sx={{ width: '100%' }}>
                Retry
              </Button>
              <Button size='large' variant='contained' sx={{ width: '100%' }} onClick={handleClear}>
                Clear
              </Button>
            </div>
          )}
        </Grid>
      </form>
    </CustomForm>
  )
}

export default InviteForm
