// ** React Imports
import { Dispatch, Fragment, SetStateAction } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { Assessment } from '@custom-types/assessmentsType'

interface props {
  title: string
  text: string
  agreeText: string
  cancelText?: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  handleAgree: () => void
  assessment: Assessment
  id: any
}
const DiaologRecorder = ({ title, agreeText, cancelText, handleAgree, open, setOpen, assessment }: props) => {
  console.log('props here', title)
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
          {assessment.tasks.map(task => (
            <DialogContentText key={task._id} id='alert-dialog-description'>
              {task?.description}
            </DialogContentText>
          ))}
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose}>{cancelText ?? 'Cancel'}</Button>
          <Button onClick={handleAgreeClick}>{agreeText}</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DiaologRecorder
