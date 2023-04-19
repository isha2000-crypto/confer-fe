// ** React Imports
import { useContext, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import CardRole from './CardRole'
import DialogRolesEdit from '../Dialog/DialogRoles/DialogRolesEdit'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'

interface Props {
  roles: any
}

const ListRoles = ({ roles }: Props) => {
  // ** States
  const ability = useContext(AbilityContext)
  const [open, setOpen] = useState<boolean>(false)
  const [dialogTitle, setDialogTitle] = useState<'Add' | 'Edit'>('Add')

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
  }

  const renderCards = () => roles.map((item: any, index: number) => <CardRole roleItem={item} key={index} />)

  return (
    <Grid container spacing={6} className='match-height'>
      {renderCards()}
      {/* {ability?.can(ACTIONS.CREATE, SUBJECTS.ROLES) && (
        <Grid item xs={12} sm={6} lg={4}>
          <Card
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              handleClickOpen()
              setDialogTitle('Add')
            }}
          >
            <Grid container sx={{ height: '100%' }}>
              <Grid item xs={5}>
                <Box sx={{ height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <img width={65} height={130} alt='add-role' src='/images/pages/add-new-role-illustration.png' />
                </Box>
              </Grid>
              <Grid item xs={7}>
                <CardContent>
                  <Box sx={{ textAlign: 'right' }}>
                    <Button
                      variant='contained'
                      sx={{ mb: 2.5, whiteSpace: 'nowrap' }}
                      onClick={() => {
                        handleClickOpen()
                        setDialogTitle('Add')
                      }}
                    >
                      Add Role
                    </Button>
                    <Typography variant='body2'>Add role, if it doesn't exist.</Typography>
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      )} */}
      {open && <DialogRolesEdit open={open} handleClose={handleClose} dialogTitle={dialogTitle} role={null} />}
    </Grid>
  )
}

export default ListRoles
