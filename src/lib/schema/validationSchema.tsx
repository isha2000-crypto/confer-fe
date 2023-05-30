import * as Yup from 'yup'

export const TenantValidationSchema = Yup.object().shape({
  name: Yup.string().required('Title is required'),
  domains: Yup.array()
    .of(Yup.string().matches(/.*.(com|uk|org|co|pk)/g, 'Please Enter valid domains'))
    .min(1, 'At least one tenant is required'),
  assessment_duration: Yup.number()
    .required('Duration is required')
    .positive()
    .min(60, 'Min Duration is 1 minute')
    .max(900, 'Max Duration is 15 minutes')
})
