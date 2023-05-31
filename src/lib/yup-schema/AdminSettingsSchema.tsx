import * as Yup from 'yup'

export const AdminSettingsSchema = Yup.object().shape({
  maxDuration: Yup.number()
    .required('Max Duration is required')
    .min(60, 'Min duration is 1 minute')
    .max(900, 'Max Duration is 15 minutes')
})
