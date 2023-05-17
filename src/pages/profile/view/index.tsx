// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

import Divider from '@mui/material/Divider'

import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { useAuth } from 'src/hooks/useAuth'

const UserViewLeft = () => {
  const auth = useAuth()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <CustomAvatar
              src={auth?.user?.picture}
              variant='rounded'
              alt={auth?.user?.name}
              sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
            />

            <Typography variant='h6' sx={{ mb: 2 }}>
              {auth?.user?.name}
            </Typography>
            <CustomChip
              skin='light'
              size='small'
              label={auth?.user?.role.title}
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
              <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
                <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3 }}>
                  <Icon icon='mdi:check' />
                </CustomAvatar>
                <div>
                  <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
                    1.23k
                  </Typography>
                  <Typography variant='body2'>Task Done</Typography>
                </div>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3 }}>
                  <Icon icon='mdi:briefcase-variant-outline' />
                </CustomAvatar>
                <div>
                  <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
                    568
                  </Typography>
                  <Typography variant='body2'>Project Done</Typography>
                </div>
              </Box>
            </Box>
          </CardContent>
          <CardContent>
            <Typography variant='h6'>Details</Typography>
            <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
            <Box sx={{ pt: 2, pb: 1 }}>
              <Box sx={{ display: 'flex', mb: 2.7 }}>
                <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                  Username: {auth?.user?.name}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', mb: 2.7 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>
                Role:{auth?.user?.role.title}
              </Typography>
              <Typography variant='body2' sx={{ textTransform: 'capitalize' }}></Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserViewLeft
