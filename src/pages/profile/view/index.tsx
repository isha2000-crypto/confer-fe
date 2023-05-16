import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import InputAdornment from '@mui/material/InputAdornment'
import DialogContentText from '@mui/material/DialogContentText'
import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { useAuth } from 'src/hooks/useAuth'
import { ThemeColor } from 'src/@core/layouts/types'

const data = {
  id: 1,
  role: 'admin',
  status: 'active',

  avatarColor: 'primary',

  avatar: '/images/avatars/4.png'
}

const UserViewLeft = () => {
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const auth = useAuth()
  console.log('user here', auth.user?.name)
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            {data.avatar.length ? (
              <CustomAvatar
                src={data.avatar}
                variant='rounded'
                alt={auth?.user?.name}
                sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
              />
            ) : (
              <CustomAvatar
                skin='light'
                variant='rounded'
                color={data.avatarColor as ThemeColor}
                sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
              ></CustomAvatar>
            )}
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
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
              Edit
            </Button>
          </CardActions>
          <Dialog
            open={openEdit}
            onClose={handleEditClose}
            aria-labelledby='user-view-edit'
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
            aria-describedby='user-view-edit-description'
          >
            <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
              Edit User Information
            </DialogTitle>
            <DialogContent>
              <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                Updating user details will receive a privacy audit.
              </DialogContentText>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='Full Name' defaultValue='hello' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Username'
                    defaultValue='there'
                    InputProps={{ startAdornment: <InputAdornment position='start'>@</InputAdornment> }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth type='email' label='Billing Email' defaultValue='email' />
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserViewLeft
