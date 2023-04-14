import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

import { Button, DialogActions } from '@mui/material'

interface Props {
  onClose: () => void
  open: boolean
  children: React.ReactNode // add children prop
}

const DialogForm = (props: Props) => {
  const { onClose, open, children } = props

  const handleDialogClick = (event: any) => {
    event.stopPropagation()
  }

  return (
    <Dialog
      open={open}
      disableEscapeKeyDown
      onClick={handleDialogClick}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          onClose()
        }
      }}
    >
      <DialogTitle>Invite Users</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogForm
