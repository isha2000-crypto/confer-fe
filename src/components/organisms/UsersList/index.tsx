import ComponentSpinner from '@components/atoms/ComponentSpinner'
import TableUsersList from '@components/molecules/Table/TableUsersList'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import PageHeader from 'src/@core/components/page-header'
import { AppDispatch, RootState } from 'src/store'
import { fetchUsers } from 'src/store/users/usersActions'

function UsersList() {
  const usersStore = useSelector((store: RootState) => store.users)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  if (usersStore.loading) return <ComponentSpinner />
  if (usersStore.error) router.push('/404')

  return (
    <>
      <PageHeader
        title={<Typography variant='h5'>Total users with their roles</Typography>}
        subtitle={
          <Typography variant='body2'>
            Find all of your company’s administrator accounts and their associate roles.
          </Typography>
        }
      />
      <TableUsersList users={usersStore.users} />
    </>
  )
}

export default UsersList
