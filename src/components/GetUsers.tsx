import React, { useEffect, useState } from 'react'
import ApiService from '../lib/api/ApiService'
import { toast } from 'react-hot-toast'

function GetUsers() {
  // const { error, loading, data, fetchUsers } = ApiUsers()
  // State for users.
  const [users, setUsers] = useState([])
  const { FetchUsers } = ApiService()
  const { error, loading, data } = FetchUsers()

  useEffect(() => {
    console.log(data)
    if (data) {
      setUsers(data.users)
    }
    if (error) {
      toast.error(error.message)
    }
  }, [data, error])

  return (
    <div>
      {/* <Error error={error} /> */}
      {loading ? 'loading..' : users.map((index, val: any) => <h1 key={index}>{val?.name}</h1>)}
    </div>
  )
}

export default GetUsers
