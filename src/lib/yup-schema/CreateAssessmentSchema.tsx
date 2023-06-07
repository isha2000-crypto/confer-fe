import * as Yup from 'yup'
import { useLazyQuery } from '@apollo/client'
import { LOAD_CURRENT_TENANT } from 'src/lib/graphql/Query'
import { useRouter } from 'next/router'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'
import { useContext, useEffect, useState } from 'react'
import { AbilityContext } from 'src/layouts/components/acl/Can'

export const CreateAssessmentSchema = () => {
  const router = useRouter()
  const ability = useContext(AbilityContext)
  const [adminDuration, setAdminDuration] = useState<number>(0)
  const [loadCurrentTenant, { error: FetchError }] = useLazyQuery(LOAD_CURRENT_TENANT) // Use useLazyQuery

  useEffect(() => {
    // Execute the query when the component mounts or when ability changes
    if (ability.can(ACTIONS.CREATE, SUBJECTS.ASSESSMENT) || ability.can(ACTIONS.UPDATE, SUBJECTS.ASSESSMENT)) {
      loadCurrentTenant().then(data => {
        setAdminDuration(data.data.currentTenant.assessment_duration)
      })
    }
  }, [ability, loadCurrentTenant])

  if (!adminDuration) {
    return null
  }
  if (FetchError) {
    router.push('/505')
  }

  return Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    type: Yup.string().required('Assessment type is required'),
    questions: Yup.array()
      .of(
        Yup.object().shape({
          type: Yup.string().required('Question type is required'),
          description: Yup.string().required('Question description is required'),
          duration: Yup.number()
            .min(60, 'Minimum duration should be 1 minute')
            .test({
              name: 'max',
              exclusive: false,
              message: ` duration value should be less than or equal to ${adminDuration / 60}`,
              test: function (value: any) {
                return value <= adminDuration
              }
            })
        })
      )
      .min(1, 'At least one question is required')
  })
}
