// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import ListRoles from '@components/molecules/Roles/ListRoles'

import FallbackSpinner from 'src/@core/components/spinner'
import { useRouter } from 'next/router'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'
import UsersList from '@components/organisms/UsersList'
import { useContext, useEffect } from 'react'

// ** Redux Imports
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { fetchRoles } from 'src/store/roles/rolesActions'
import { AbilityContext } from 'src/layouts/components/acl/Can'

const RolesComponent = () => {
  const dispatch = useDispatch<AppDispatch>()
  const rolesStore = useSelector((store: RootState) => store.roles)
  const ability = useContext(AbilityContext)

  useEffect(() => {
    dispatch(fetchRoles())
  }, [dispatch])

  const router = useRouter()
  if (rolesStore.loading) return <FallbackSpinner />
  if (rolesStore.error) router.push('/404')

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={<Typography variant='h5'>Roles List</Typography>}
        subtitle={
          <Typography variant='body2'>
            A role provided access to predefined menus and features so that depending on assigned role an administrator
            can have access to what he need
          </Typography>
        }
      />
      <Grid item xs={12} sx={{ mb: 5 }}>
        <ListRoles roles={rolesStore.roles} />
      </Grid>
      {ability?.can(ACTIONS.READ, SUBJECTS.USERS) && (
        <Grid item xs={12}>
          <UsersList />
        </Grid>
      )}
    </Grid>
  )
}

RolesComponent.acl = {
  action: ACTIONS.READ,
  subject: SUBJECTS.ROLES
}

export default RolesComponent
