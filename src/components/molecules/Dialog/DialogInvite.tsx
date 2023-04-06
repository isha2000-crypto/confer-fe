import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import InviteForm from '../../organisms/Forms/InviteForm'
import { Button, DialogActions } from '@mui/material'

interface Props {
  onClose: () => void
  open: boolean
}

const DialogInvite = (props: Props) => {
  const { onClose, open } = props

  const handleDialogClick = (event: any) => {
    event.stopPropagation()
  }

  return (
    <Dialog
      open={open}
      disableEscapeKeyDown
      onClick={handleDialogClick}
      onClose={(event, reason) => {
        console.log(reason)
        if (reason !== 'backdropClick') {
          onClose()
        }
      }}
    >
      <DialogTitle>Invite Users</DialogTitle>
      <DialogContent>
        <InviteForm />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogInvite
