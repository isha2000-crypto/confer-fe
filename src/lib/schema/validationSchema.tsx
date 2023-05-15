import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  type: Yup.string().required('Assessment type is required'),
  questions: Yup.array()
    .of(
      Yup.object().shape({
        type: Yup.string().required('Question type is required'),
        description: Yup.string().required('Question description is required'),
        duration: Yup.number().required('Question duration is required')
      })
    )
    .min(1, 'At least one question is required')
})
export const TenantValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  domains: Yup.array()
    .of(Yup.string().matches(/.*.(com|uk|org|co|pk)/g, 'Please Enter valid domains'))
    .min(1, 'At least one tenant is required')
})
