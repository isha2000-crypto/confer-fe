import { Dialog, DialogTitle, Typography, DialogContent } from '@mui/material'
import React from 'react'

// // ** Redux Imports
import { RootState } from 'src/store'

import { useSelector } from 'react-redux'
import EditUserRole from '@components/organisms/Forms/EditUserRole'
import { UsersType } from '@custom-types/user-type'

interface Props {
  handleClose: any
  open: boolean
  user: UsersType
}

function DialogUserEdit({ handleClose, open, user }: Props) {
  const closeDialog = () => {
    handleClose()
  }

  const roleStore = useSelector((store: RootState) => store.roles)
  const loading = roleStore.updateLoading

  return (
    <Dialog fullWidth maxWidth='md' scroll='body' onClose={closeDialog} open={open}>
      <DialogTitle sx={{ textAlign: 'center' }}>
        <Typography variant='h5' component='span'>
          {`Edit User`}
        </Typography>
        <Typography variant='body2'>Update User Setting</Typography>
      </DialogTitle>
      <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
        <EditUserRole loading={loading} handleClose={handleClose} user={user} />
      </DialogContent>
    </Dialog>
  )
}

export default DialogUserEdit
