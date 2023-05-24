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
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchTenants } from 'src/store/tenants/tenantsActions'
import { Box, Button } from '@mui/material'
import DialogTenantCreate from '@components/molecules/Dialog/DialogTenant/DialogTenantCreate'

const TenantsList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const tenantsStore = useSelector((store: RootState) => store.tenants)
  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  useEffect(() => {
    dispatch(fetchTenants())
  }, [dispatch])
  const router = useRouter()
  if (tenantsStore.loading) return <FallbackSpinner />
  if (tenantsStore.error) router.push('/404')

  return (
    <Grid container spacing={6}>
      {open && <DialogTenantCreate open={open} handleClose={handleClose} dialogTitle='Create Tenant' />}
      <PageHeader
        title={<Typography variant='h5'>Tenants List</Typography>}
        subtitle={<Typography variant='body2'>You can view all the available Tenants here</Typography>}
      />
      <Grid item xs={12} sx={{ mb: 5 }}>
        <Box sx={{ textAlign: 'right' }}>
          <Button
            variant='contained'
            sx={{ mb: 2.5, whiteSpace: 'nowrap' }}
            onClick={() => {
              handleClickOpen()
            }}
          >
            Add Tenant
          </Button>
        </Box>
        <TableTenantsList tenants={tenantsStore.tenants} />
      </Grid>
    </Grid>
  )
}

TenantsList.acl = {
  action: ACTIONS.READ,
  subject: SUBJECTS.SYSTEM_ADMIN
}

export default TenantsList
