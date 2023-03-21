import { Dispatch, Fragment, SetStateAction } from 'react'
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

const DialogRecorder = ({ title, agreeText, cancelText, handleAgree, open, setOpen, assessment }: props) => {
  const handleClose = () => {
    setOpen(false)
  }

  const handleAgreeClick = () => {
    handleAgree()
    handleClose()
  }
  const displayTime = (assessment: Assessment) => {
    const duration = assessment.tasks.reduce((accumulator: number, task: any) => accumulator + task.duration, 0)

    return `${duration / 60} m`
  }
  console.log('I am the time ', displayTime(assessment))

  return (
    <Fragment>
      <Dialog
        open={open}
        disableEscapeKeyDown
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleClose()
          }
        }}
        PaperProps={{
          style: {
            backgroundColor: '#F5F5F5' // Change the background color of the Dialog component
          }
        }}
      >
        <DialogTitle style={{ color: '#333', fontSize: '1.2rem', padding: '24px' }}>{title}</DialogTitle>
        <DialogContent> Total Questions:{assessment.tasks.length}</DialogContent>
        <DialogContent> Max Time:{displayTime(assessment)}</DialogContent>
        <DialogContent dividers>
          {assessment.tasks.map((task, index) => (
            <DialogContentText
              key={task._id}
              style={{ fontSize: '1rem', marginBottom: '16px', padding: '8px' }} // Customize the DialogContentText component
            >
              {`${index + 1}. ${task?.description}`}
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

export default DialogRecorder
