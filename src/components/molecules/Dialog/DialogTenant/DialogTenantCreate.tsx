import CreateTenant from '@components/organisms/Forms/CreateTenant'
import { Dialog, DialogTitle, Typography, DialogContent } from '@mui/material'
import React from 'react'

// import TableRoleEdit from '@components/molecules/Table/TableRoleEdit'
// import Alert from '@mui/material/Alert'

// // ** Redux Imports
// import { useDispatch } from 'react-redux'
// import { AppDispatch, RootState } from 'src/store'
// import { addNewRole, updateRole } from 'src/store/roles/rolesActions'
// import { useSelector } from 'react-redux'
// import { clearErrors } from 'src/store/roles/rolesSlice'
// import { FORM_ACTIONS } from '@custom-types/enum'

interface Props {
  handleClose: any
  open: boolean
  dialogTitle: string
}

function DialogTenantCreate({ handleClose, open, dialogTitle }: Props) {
  // const dispatch = useDispatch<AppDispatch>()

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
