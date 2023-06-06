import * as Yup from 'yup'

export const InviteFormSchema = Yup.object().shape({
  emailInput: Yup.string().test('emailInput', 'Invalid email format', value => {
    if (!value) return true
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return emailPattern.test(value || '')
  }),
  emails: Yup.array()
    .min(1, 'Minimum one email is required')
    .required('Emails are required')
    .test({
      name: 'emails',
      exclusive: false,
      message: 'Invalid email format',
      test: function (value: any) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const invalidEmails = value.some((item: any) => emailPattern.test(item.email))

        return invalidEmails
      }
    })
})
