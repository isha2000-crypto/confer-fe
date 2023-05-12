import { Chip, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import ActionButtons from '@components/molecules/Actions/ActionButtons'
import { TenantValidationSchema } from 'src/lib/schema/validationSchema'

const CreateTenant = ({ handleCancel }: { handleCancel: any }) => {
  const [domain, setDomain] = useState<string>('')
  const [domains, setDomains] = useState<string[]>([])

  const handleDomainChange = (event: any) => {
    setDomain(event.target.value)
  }
  const handleAddDomain = (event: any) => {
    event.preventDefault()
    const newDomains = domain.split(' ').filter(domain => domain !== '')
    const regExPattern = /.*\.(com|uk|org|co|pk)/g
    const validDomains = newDomains.filter(domain => regExPattern.test(domain))
    setDomains([...domains, ...validDomains])
    formik.values.domains = [...formik.values.domains, ...validDomains]
    setDomain('')
  }
  const handleRemoveDomain = (domain: string) => {
    setDomains(domains.filter(e => e !== domain))
  }
  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      handleAddDomain(event)
    }
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      domains: domains
    },
    onSubmit: values => {
      console.log(values)

      //API INTEGRATION
    },
    validationSchema: TenantValidationSchema
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={5} padding={8}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name='title'
            label='Title'
            placeholder='Enter Title'
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label='Domains'
            placeholder='Enter domains separated by a single space'
            value={domain}
            onChange={handleDomainChange}
            onKeyPress={handleKeyPress}
            error={formik.touched.domains && Boolean(formik.errors.domains)}
            helperText={formik.touched.domains && formik.errors.domains}
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
