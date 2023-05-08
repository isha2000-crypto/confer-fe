// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

import FallbackSpinner from 'src/@core/components/spinner'
import { useRouter } from 'next/router'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'

// ** Redux Imports
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import TableTenantsList from '@components/molecules/TableTenantsList'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchTenants } from 'src/store/tenants/tenantsActions'

const TenantsComponent = () => {
  const dispatch = useDispatch<AppDispatch>()
  const tenantsStore = useSelector((store: RootState) => store.tenants)
  useEffect(() => {
    dispatch(fetchTenants())
  }, [dispatch])
  const router = useRouter()
  if (tenantsStore.loading) return <FallbackSpinner />
  if (tenantsStore.error) router.push('/404')

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={<Typography variant='h5'>Tenants List</Typography>}
        subtitle={<Typography variant='body2'>You can view all the available Tenants here</Typography>}
      />
      <Grid item xs={12} sx={{ mb: 5 }}>
        <TableTenantsList tenants={tenantsStore.tenants} />
      </Grid>
    </Grid>
  )
}

TenantsComponent.acl = {
  action: ACTIONS.READ,
  subject: SUBJECTS.ROLES
}

export default TenantsComponent
