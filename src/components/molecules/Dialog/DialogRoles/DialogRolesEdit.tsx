import { Dialog, DialogTitle, Typography, DialogContent } from '@mui/material'
import React from 'react'
import TableRoleEdit from '@components/molecules/Table/TableRoleEdit'
import Alert from '@mui/material/Alert'

// ** Redux Imports
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { addNewRole, updateRole } from 'src/store/roles/rolesActions'
import { useSelector } from 'react-redux'
import { clearErrors } from 'src/store/roles/rolesSlice'

interface Props {
  handleClose: any
  open: boolean
  dialogTitle: string
  role: any
}

function DialogRolesEdit({ role, handleClose, open, dialogTitle }: Props) {
  const dispatch = useDispatch<AppDispatch>()
  const roleStore = useSelector((store: RootState) => store.roles)
  const closeDialog = () => {
    handleClose()
    dispatch(clearErrors())
  }

  const handleUpdate = (updatedRole: any) => {
    dispatch(updateRole(role._id, updatedRole))
  }
  const handleNewRole = (role: any) => {
    dispatch(addNewRole(role))
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
        {roleStore.updateError ||
          (roleStore.addRoleError && <Alert severity='error'>{roleStore.updateError || roleStore.addRoleError}</Alert>)}
        <TableRoleEdit
          role={role}
          loading={dialogTitle === 'Edit' ? roleStore.updateLoading : roleStore.addRoleLoading}
          handleSubmit={dialogTitle === 'Edit' ? handleUpdate : handleNewRole}
          handleCancel={closeDialog}
          buttonTitle={dialogTitle}
        />
      </DialogContent>
    </Dialog>
  )
}

export default DialogRolesEdit
