import * as Yup from 'yup'

export const InviteFormSchema = Yup.object().shape({
  emails: Yup.string()
    .required('Emails are required')
    .test('emails', 'Invalid email format', value => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      return emailPattern.test(value || '')
    }),
  userRole: Yup.string().required('Role is required')
})
