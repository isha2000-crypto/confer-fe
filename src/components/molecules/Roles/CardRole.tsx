import { Grid, Card, CardContent, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import React, { SyntheticEvent, useContext, useState } from 'react'
import DialogRolesEdit from '../Dialog/DialogRoles/DialogRolesEdit'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'

interface Props {
  roleItem: any
}
function CardRole({ roleItem }: Props) {
  const ability = useContext(AbilityContext)
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card>
        <CardContent>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='body2'>{`Created By ${roleItem.creator.name}`}</Typography>
          </Box>
          {ability?.can(ACTIONS.UPDATE, SUBJECTS.ROLES) && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6'>{roleItem.title}</Typography>
                <Typography
                  href='/'
                  variant='body2'
                  component={Link}
                  sx={{ color: 'primary.main' }}
                  onClick={(e: SyntheticEvent) => {
                    e.preventDefault()
                    setOpen(true)
                  }}
                >
                  Edit Role
                </Typography>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
      {open && <DialogRolesEdit open={open} handleClose={handleClose} dialogTitle={'Edit'} role={roleItem} />}
    </Grid>
  )
}

export default CardRole
