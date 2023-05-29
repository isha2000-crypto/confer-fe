import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

import Divider from '@mui/material/Divider'

import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { UserDataType } from '@custom-types/contextTypes'
import BoxIconDescription from '@components/molecules/Box/BoxIconDescription'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'
import BoxTitleBold from '@components/molecules/Box/BoxTitleBold'

interface props {
  user: UserDataType
  assessmentsCount?: number
  submissionCount?: number
}

function UserDetails({ user, assessmentsCount = 0, submissionCount = 0 }: props) {
  const ability = useContext(AbilityContext)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <CustomAvatar
              src={user?.picture || ''}
              variant='rounded'
              alt={user?.name}
              sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
            />

            <Typography variant='h6' sx={{ mb: 2 }}>
              {user?.name}
            </Typography>
            <CustomChip
              skin='light'
              size='small'
              label={user?.role.title}
              sx={{
                height: 20,
                fontWeight: 600,
                borderRadius: '5px',
                fontSize: '0.875rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { mt: -0.25 }
              }}
            />
          </CardContent>
          <CardContent sx={{ my: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {ability.can(ACTIONS.CREATE, SUBJECTS.ASSESSMENT) && (
                <BoxIconDescription
                  icon='mdi:briefcase-variant-outline'
                  title={`${assessmentsCount}`}
                  description='Total Assessments Created'
                />
              )}
              {ability.can(ACTIONS.CREATE, SUBJECTS.ASSESSMENT_SUBMISSION) && (
                <BoxIconDescription icon='mdi:check' title={`${submissionCount}`} description='Total Submissions' />
              )}
            </Box>
          </CardContent>
          <CardContent>
            <Typography variant='h6'>Details</Typography>
            <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
            <Box sx={{ pt: 2, pb: 1 }}>
              <BoxTitleBold title='Name' description={user.name} />
              <BoxTitleBold title='Email' description={user.email} />
              <BoxTitleBold title='Role' description={user.role.title} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserDetails
