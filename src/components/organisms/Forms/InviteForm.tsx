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
  const [loading, setLoading] = useState(false)
  const [inviteUserMutation] = useMutation(INVITE_USER_MUTATION)
  const dispatch = useDispatch<AppDispatch>()
  const rolesStore = useSelector((store: RootState) => store.roles)
  const [userRole, setUserRole] = useState(rolesStore.roles.length > 0 ? rolesStore.roles[0].title : '')
  const [formDisabled, setFormDisabled] = useState(false)

  const handleInvite = (values: any, { setSubmitting }: { setSubmitting: any }) => {
    setLoading(true)
    setFormDisabled(true)
    inviteUserMutation({
      variables: { usersInvitationInput: { emails: values.emails } }
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
        setSubmitting(false)
      })
  }

  useEffect(() => {
    dispatch(fetchRoles())
  }, [dispatch])

  const formik = useFormik({
    initialValues: {
      emailInput: '',
      emails: [],
      userRole: rolesStore.roles.length > 0 ? rolesStore.roles[0].title : ''
    },
    validationSchema: InviteFormSchema,
    onSubmit: handleInvite
  })

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
    formik.setFieldValue('emails', [...formik.values?.emails, ...validEmails])
    formik.setFieldValue('emailInput', '')
  }

  const handleClear = () => {
    formik.setFieldValue('emails', [])
  }

  const handleRoleChange = (event: any) => {
    const selectedRole = event.target.value
    setUserRole(selectedRole)
    formik.setFieldValue('userRole', selectedRole)
  }

  const handleRemoveEmail = (email: string) => {
    formik.setFieldValue(
      'emails',
      formik.values?.emails.filter((e: string) => e !== email)
    )
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
              disabled={formDisabled}
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
                disabled={formDisabled}
                value={userRole}
                onChange={handleRoleChange}
                label='Role'
                placeholder='Role'
              >
                {rolesStore.roles.map(role => (
                  <MenuItem key={role.title} value={role.title}>
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
            disabled={!formik.values?.emailInput}
          >
            Add
          </Button>
        </Grid>
        <br />
        <Grid item xs={12}>
          {formik.values.emails.map(email => (
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
          <Button size='large' type='submit' variant='contained' sx={{ width: '100%' }}>
            {loading ? <CircularProgress size={24} /> : 'Send Invite'}
          </Button>
          {!userRole && (
            <Typography color='error' variant='caption'>
              Please select a role before adding emails.
            </Typography>
          )}
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
