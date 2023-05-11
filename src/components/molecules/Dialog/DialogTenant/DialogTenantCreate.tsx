import CreateTenant from '@components/organisms/Forms/CreateTenant'
import { Dialog, DialogTitle, Typography, DialogContent } from '@mui/material'
import React from 'react'

interface Props {
  handleClose: any
  open: boolean
  dialogTitle: string
}

function DialogTenantCreate({ handleClose, open, dialogTitle }: Props) {
  return (
    <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleClose} open={open}>
      <DialogTitle sx={{ textAlign: 'center' }}>
        <Typography variant='h5' component='span'>
          {`${dialogTitle} Role`}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
        <CreateTenant handleCancel={handleClose} />
      </DialogContent>
    </Dialog>
  )
}

export default DialogTenantCreate
