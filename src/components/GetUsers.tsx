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
    console.log("I am data",data)
    if (data) {
      setUsers(data.users)
    }
    if (error) {
      toast.error(error.message)
    }
  }, [data,error])
  console.log("we are users",users)
  
return (
    <div>
      {/* <Error error={error} /> */}
      {/* {loading ? 'loading..' : users.map((index, val: any) => <h1 key={index}>{val?.name}</h1>)} */}
      {loading ? 'loading..' : users.map((user, index) => (
        <h1 key={index}>{user.name}</h1>
      ))}
    </div>
  )
}

export default GetUsers
