// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import ListRoles from '@components/molecules/Roles/ListRoles'

import { useQuery } from '@apollo/client'
import { LOAD_ROLES } from 'src/lib/graphql/Query'
import FallbackSpinner from 'src/@core/components/spinner'
import { useRouter } from 'next/router'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'

const RolesComponent = () => {
  const { data, loading, error } = useQuery(LOAD_ROLES)
  const router = useRouter()
  if (loading) return <FallbackSpinner />
  if (error) router.push('/404')

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
        <ListRoles roles={data?.roles} />
      </Grid>
    </Grid>
  )
}

RolesComponent.acl = {
  action: ACTIONS.READ,
  subject: SUBJECTS.ROLES
}

export default RolesComponent
