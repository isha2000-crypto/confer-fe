import { Dialog, DialogTitle, Typography, DialogContent } from '@mui/material'
import React from 'react'
import TableRoleEdit from '@components/molecules/Table/TableRoleEdit'
import Alert from '@mui/material/Alert'

// ** Redux Imports
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { updateRole } from 'src/store/roles/rolesActions'
import { useSelector } from 'react-redux'

interface Props {
  handleClose: any
  open: boolean
  dialogTitle: string
  role: any
}

function DialogRolesEdit({ role, handleClose, open, dialogTitle }: Props) {
  const closeDialog = () => {
    handleClose()
  }

  const dispatch = useDispatch<AppDispatch>()
  const roleStore = useSelector((store: RootState) => store.roles)

  const handleUpdate = (updatedRole: any) => {
    dispatch(updateRole(role._id, updatedRole))
  }

  return (
    <Dialog fullWidth maxWidth='md' scroll='body' onClose={closeDialog} open={open}>
      <DialogTitle sx={{ textAlign: 'center' }}>
        <Typography variant='h5' component='span'>
          {`${dialogTitle} Role`}
        </Typography>
        <Typography variant='body2'>Set Role Permissions</Typography>
      </DialogTitle>
      <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
        {roleStore.updateError && <Alert severity='error'>{roleStore.updateError}</Alert>}
        <TableRoleEdit
          role={role}
          loading={roleStore.updateLoading}
          handleSubmit={handleUpdate}
          handleCancel={closeDialog}
        />
      </DialogContent>
    </Dialog>
  )
}

export default DialogRolesEdit
