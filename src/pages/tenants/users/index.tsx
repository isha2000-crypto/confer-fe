import ComponentSpinner from '@components/atoms/ComponentSpinner'
import TableUsersList from '@components/molecules/Table/TableUsersList'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'
import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import PageHeader from 'src/@core/components/page-header'
import { AppDispatch, RootState } from 'src/store'
import { fetchRoles } from 'src/store/roles/rolesActions'
import { fetchUsers } from 'src/store/users/usersActions'

const Users = () => {
  const usersStore = useSelector((store: RootState) => store.users)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchRoles())
  }, [dispatch])

  if (usersStore.loading) return <ComponentSpinner />
  if (usersStore.error) router.push('/404')

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={<Typography variant='h5'>Users List</Typography>}
        subtitle={<Typography variant='body2'>You can view all the available Users here</Typography>}
      />
      <Grid item xs={12} sx={{ mb: 5 }}>
        <TableUsersList users={usersStore.users} />
      </Grid>
    </Grid>
  )
}
Users.acl = {
  action: ACTIONS.READ,
  subject: SUBJECTS.SYSTEM_ADMIN
}
export default Users
