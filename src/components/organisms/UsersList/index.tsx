import TableUsersList from '@components/molecules/TableUsersList'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'

function UsersList() {
  const usersStore = useSelector((store: RootState) => store.users)

  return <TableUsersList users={usersStore.users} />
}

export default UsersList
