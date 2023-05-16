import { Chip, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import ActionButtons from '@components/molecules/Actions/ActionButtons'
import { TenantValidationSchema } from 'src/lib/schema/validationSchema'

import { useMutation } from '@apollo/client'
import { CREATE_TENANT_MUTATION } from 'src/lib/graphql/Mutation/tenantMutation'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { fetchTenants } from 'src/store/tenants/tenantsActions'

const CreateTenant = ({ handleCancel }: { handleCancel: any }) => {
  const [domain, setDomain] = useState<string>('')
  const [domains, setDomains] = useState<string[]>([])

  const [createTenantMutation] = useMutation(CREATE_TENANT_MUTATION)
  const dispatch = useDispatch<AppDispatch>()

  const handleDomainChange = (event: any) => {
    setDomain(event.target.value)
  }
  const handleAddDomain = (event: any) => {
    event.preventDefault()
    const newDomains = domain.split(' ').filter(domain => domain !== '')
    setDomains([...domains, ...newDomains])
    formik.values.domains = [...formik.values.domains, ...newDomains]
    setDomain('')
  }
  const handleRemoveDomain = (domain: string) => {
    setDomains(domains.filter(e => e !== domain))
    formik.values.domains = formik.values.domains.filter(e => e !== domain)
  }
  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      handleAddDomain(event)
    }
  }
  const handleFormSubmission = (values: any) => {
    console.log(values)

    createTenantMutation({
      variables: {
        createTenantInput: values
      }
    })
      .then(result => {
        console.log(result.data)
        setTimeout(() => {
          resetForm()
          handleCancel()
          dispatch(fetchTenants())
        }, 2000)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const resetForm = () => {
    setDomain('')
    setDomains([])
    formik.values.domains = []
    formik.values.name = ''
    formik.values.assessment_duration = 0
  }
  const formik = useFormik({
    initialValues: {
      name: '',
      domains: domains,
      assessment_duration: 0
    },
    onSubmit: values => handleFormSubmission({ ...values }),

    validationSchema: TenantValidationSchema
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={5} padding={8}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name='name'
            label='Name'
            placeholder='Enter Name'
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type='number'
            name='assessment_duration'
            label='Max Assessment Duration'
            placeholder='Enter max duration for assessment'
            value={formik.values.assessment_duration}
            onChange={e => {
              formik.handleChange(e)
            }}
            error={formik.touched.assessment_duration && Boolean(formik.errors.assessment_duration)}
            helperText={formik.touched.assessment_duration && formik.errors.assessment_duration}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name='domains'
            label='Domains'
            placeholder='Enter domain and Press Enter'
            value={domain}
            onChange={handleDomainChange}
            onKeyPress={handleKeyPress}
            error={formik.touched.domains && Boolean(formik.errors.domains)}
            helperText={(formik.touched.domains && formik.errors.domains) || 'example: abc.com, abc.net, abc.co ....'}
          />
        </Grid>
        <Grid item xs={6}>
          {domains.map(domain => (
            <Chip
              key={domain}
              label={`${domain}`}
              onDelete={() => handleRemoveDomain(domain)}
              deleteIcon={<CancelIcon />}
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Grid>
      </Grid>
      <ActionButtons loading={false} submitText='Add' handleCancel={handleCancel} />
    </form>
  )
}

export default CreateTenant
