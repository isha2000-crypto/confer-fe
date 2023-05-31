import { useState, useEffect } from 'react'
import { SUBJECTS, ACTIONS } from '@custom-types/enum'
import { Card, CardContent, CardHeader, Button } from '@mui/material'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_ASSESSMENT_DURATION } from 'src/lib/graphql/Mutation'
import { useAuth } from 'src/hooks/useAuth'
import { LOAD_CURRENT_TENANT } from 'src/lib/graphql/Query'
import FallbackSpinner from 'src/@core/components/spinner'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import InputQuestionDuration from '@components/atoms/InputQuestionDuration'
import { Field, Formik, Form, ErrorMessage } from 'formik'
import { AdminSettingsSchema } from 'src/lib/yup-schema'

function AdminSettings() {
  const [updateAssessmentDuration] = useMutation(UPDATE_ASSESSMENT_DURATION)
  const auth = useAuth()
  const router = useRouter()
  const { error, loading, data } = useQuery(LOAD_CURRENT_TENANT)
  const [organizationSettings, setOrganizationSettings] = useState(data?.currentTenant)

  useEffect(() => {
    if (data) {
      setOrganizationSettings(data?.currentTenant)
    }
  }, [data])

  const handleSubmit = (values: any) => {
    console.log('hello three')
    updateAssessmentDuration({
      variables: {
        updateOrganizationId: auth.user?.tenantId,
        updateOrganizationInput: { assessment_duration: values.maxDuration }
      }
    }).then(() => {
      toast.success('Duration added successfully!')
    })
  }

  if (loading) {
    return <FallbackSpinner />
  }

  if (error) {
    router.push('/500')
  }

  return (
    organizationSettings && (
      <Card>
        <CardHeader title='Setting' />
        <CardContent sx={{ display: 'flex', width: '100%' }}>
          <Formik
            initialValues={{ maxDuration: organizationSettings?.assessment_duration || 0 }}
            onSubmit={handleSubmit}
            validationSchema={AdminSettingsSchema}
          >
            <Form>
              <Field name='maxDuration' type='number'>
                {({ field, meta, form }: any) => (
                  <div>
                    <InputQuestionDuration
                      label='Max Duration'
                      placeholder='Max Duration'
                      onChange={(value: number) => form.setFieldValue('maxDuration', value)}
                      value={field.value}
                      error={meta.touched && meta.error}
                      helperText={(meta.touched && meta.error) || 'Max Duration is 15 minutes'}
                    />
                    <ErrorMessage name='maxDuration' component='div' />
                  </div>
                )}
              </Field>
              <Button variant='contained' type='submit' sx={{ float: 'right', marginLeft: '1000px' }}>
                Add
              </Button>
            </Form>
          </Formik>
        </CardContent>
      </Card>
    )
  )
}

AdminSettings.acl = {
  action: ACTIONS.READ,
  subject: SUBJECTS.ADMIN_SETTINGS
}

export default AdminSettings
