import { useQuery } from '@apollo/client'
import { LOAD_ASSESSMENT } from '../graphql/Query/index'
import { toast } from 'react-hot-toast'

export const FetchAssessments = async () => {
  const { error, loading, data } = useQuery(LOAD_ASSESSMENT)

  return {
    fetchAssessments: () => {
      if (error) {
        toast.error(error.message)
      }
      if (!data) {
      }

      return { error, loading, data }
    }
  }
}
