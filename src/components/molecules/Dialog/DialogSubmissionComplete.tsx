// ** React Imports
import { Dispatch, Fragment, SetStateAction } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import CircularProgress from '@mui/material/CircularProgress'
import Icon from 'src/@core/components/icon'

interface props {
  title: string
  text: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  allUploaded: boolean
  completed: boolean
}
const DialogSubmissionComplete = ({ title, text, open, setOpen, allUploaded, completed }: props) => {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Fragment>
      <Dialog
        open={open}
        disableEscapeKeyDown
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleClose()
          }
        }}
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div>{!allUploaded ? 'Uploading your videos' : 'Videos Have been Uploaded!'}</div>
            <div>{completed ? 'Assessment Has been submitted successfully!' : text}</div>
            <div>
              {completed ? (
                <Icon icon='mdi:tick' fontSize={30} color={'green'} />
              ) : (
                <CircularProgress disableShrink sx={{ mt: 6 }} />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default DialogSubmissionComplete
