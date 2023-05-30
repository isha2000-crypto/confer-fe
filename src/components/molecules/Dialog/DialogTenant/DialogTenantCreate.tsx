import CreateTenant from '@components/organisms/Forms/CreateTenant'
import { Dialog, DialogTitle, Typography, DialogContent } from '@mui/material'
import React from 'react'

interface Props {
  handleClose: any
  open: boolean
  dialogTitle: string
  tenant?: any
}

function DialogTenantCreate({ handleClose, open, dialogTitle, tenant }: Props) {
  return (
    <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleClose} open={open}>
      <DialogTitle sx={{ textAlign: 'center' }}>
        <Typography variant='h5' component='span'>
          {`${dialogTitle} Tenant`}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
        <CreateTenant handleCancel={handleClose} title={dialogTitle} tenant={tenant} />
      </DialogContent>
    </Dialog>
  )
}

export default DialogTenantCreate
