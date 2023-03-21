// ** React Imports
import { Dispatch, Fragment, SetStateAction } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CircularProgress from '@mui/material/CircularProgress'
import Icon from 'src/@core/components/icon'

interface props {
  title: string
  text: string
  agreeText: string
  cancelText?: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  handleAgree: () => void
  complete: boolean
}
const DialogSubmissionComplete = ({ title, text, agreeText, handleAgree, open, setOpen, complete }: props) => {
  const handleClose = () => {
    setOpen(false)
  }

  const handleAgreeClick = () => {
    handleAgree()
    handleClose()
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
            <div>{complete ? 'All Assessments have successfully Been Submitted!' : text}</div>
            <div>
              {complete ? (
                <Icon icon='mdi:tick' fontSize={30} color={'green'} />
              ) : (
                <CircularProgress disableShrink sx={{ mt: 6 }} />
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleAgreeClick} disabled={!complete}>
            {agreeText}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DialogSubmissionComplete
