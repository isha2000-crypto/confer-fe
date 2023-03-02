// function getUsers : error,data,loading   will utilize useQuery
import { useQuery } from '@apollo/client'
import { LOAD_USERS } from '../graphql/Query/index'
import { toast } from 'react-hot-toast'

export const FetchUsers = () => {
  const { error, loading, data } = useQuery(LOAD_USERS)

  return {
    error,
    loading,
    data,
    fetchUsers: () => {
      if (error) {
        toast.error(error.message)
      }
      if (!data) {
      }

      return { error, loading, data }
    }
  }
}
