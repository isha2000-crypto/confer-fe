import { useQuery } from '@apollo/client'
import { LOAD_ASSESSMENT } from '../graphql/Query/index'
import { toast } from 'react-hot-toast'

export const FetchAssessments = () => {
  const { error, loading, data } = useQuery(LOAD_ASSESSMENT )

  return {
    error,
    loading,
    data,
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
