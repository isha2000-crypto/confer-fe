import * as Yup from 'yup'
import { useQuery } from '@apollo/client'
import { LOAD_CURRENT_TENANT } from 'src/lib/graphql/Query'
import { useRouter } from 'next/router'

export const CreateSchema = () => {
  const router = useRouter()
  const { data, error } = useQuery(LOAD_CURRENT_TENANT)
  if (error) {
    router.push('/505')

    return null
  }
  const admin_duration = data?.currentTenant?.assessment_duration ?? 0

  return Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    type: Yup.string().required('Assessment type is required'),
    questions: Yup.array()
      .of(
        Yup.object().shape({
          type: Yup.string().required('Question type is required'),
          description: Yup.string().required('Question description is required'),
          duration: Yup.number().test({
            name: 'max',
            exclusive: false,
            message: ` duration value should be less than or equal to ${admin_duration / 60}`,
            test: function (value: any) {
              return value <= admin_duration
            }
          })
        })
      )
      .min(1, 'At least one question is required')
  })
}
