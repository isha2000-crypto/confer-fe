/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef } from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Button, Dialog, Link, Typography } from '@mui/material'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import Bowser from 'bowser'

import { MediaPermissionsError, MediaPermissionsErrorType, requestMediaPermissions } from 'mic-check'

const browser = Bowser.getParser(window.navigator.userAgent)

enum DialogType {
  explanation = 'explanation',

  systemDenied = 'systemDenied',
  userDenied = 'userDenied',
  trackError = 'trackError'
}

interface props {
  setMediaPermissions: any
}
const DialogMediaOnboarding = ({ setMediaPermissions }: props) => {
  const [showDialog, setShowDialog] = React.useState<DialogType | null>(null)

  const [audioAllowed, setAudioAllowed] = React.useState<boolean>(false)
  const [videoAllowed, setVideoAllowed] = React.useState<boolean>(false)

  const [errorDetails, setErrorDetails] = React.useState<MediaPermissionsError | undefined>()

  // Create wrapper refs to access values even during setTimeout
  // https://github.com/facebook/react/issues/14010
  const showDialogRef = useRef(showDialog)
  showDialogRef.current = showDialog
  const audioAllowedRef = useRef(audioAllowed)
  audioAllowedRef.current = audioAllowed
  const videoAllowedRef = useRef(videoAllowed)
  videoAllowedRef.current = videoAllowed

  React.useEffect(() => {
    checkMediaPermissions()
  }, [])

  React.useEffect(() => {
    if (audioAllowed || videoAllowed) {
      setMediaPermissions(true)

      // set the default devices
      // MediaManager.findMediaDevices()
    }
  }, [audioAllowed, videoAllowed])

  const checkForExplanationDialog = () => {
    if ((!audioAllowedRef.current || !videoAllowedRef.current) && showDialogRef.current === null)
      setShowDialog(DialogType.explanation)
  }

  const checkMediaPermissions = () => {
    // TODO: listen to if there is a change on the audio/video piece?

    requestMediaPermissions()
      .then(() => {
        setAudioAllowed(true)
        setVideoAllowed(true)
        setShowDialog(null)

        return true
      })
      .catch((error: MediaPermissionsError) => {
        if (error.type === MediaPermissionsErrorType.SystemPermissionDenied) {
          // user denied permission
          setShowDialog(DialogType.systemDenied)
        } else if (error.type === MediaPermissionsErrorType.UserPermissionDenied) {
          // browser doesn't have access to devices
          setShowDialog(DialogType.userDenied)
        } else if (error.type === MediaPermissionsErrorType.CouldNotStartVideoSource) {
          // most likely when other apps or tabs are using the cam/mic (mostly windows)
          setShowDialog(DialogType.trackError)
        } else {
        }
        setErrorDetails(error)

        return false
      })

    setTimeout(() => {
      checkForExplanationDialog()
    }, 500)
  }

  const handlePermissionsRetry = async () => {
    checkMediaPermissions()
  }

  const _renderTryAgain = (text?: string) => {
    return (
      <div style={{ width: '100%', marginTop: 20 }}>
        <Button
          onClick={() => {
            if (browser.getBrowserName() === 'Safari') {
              // If on Safari, rechecking permissions results in glitches so just refresh the page
              window.location.reload()
            } else {
              handlePermissionsRetry()
            }
          }}
          color='primary'
          style={{ float: 'right' }}
        >
          {text ? text : 'Retry'}
        </Button>
      </div>
    )
  }

  const _renderErrorMessage = () => {
    if (!errorDetails) return null

    return (
      <div style={{ marginTop: 10 }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />} aria-controls='panel1a-content' id='panel1a-header'>
            <Typography variant='caption' style={{ color: 'red' }}>
              Error Details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant='caption'>
              {errorDetails.name}: {errorDetails.message}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    )
  }

  const _renderExplanationDialog = () => {
    return (
      <div>
        <DialogTitle>Allow App to use your camera and microphone</DialogTitle>
        <DialogContent>App needs access to your camera and microphone in order to record videos.</DialogContent>
      </div>
    )
  }

  const _renderUserDeniedDialog = () => {
    return (
      <div>
        <DialogTitle>Camera and microphone are blocked</DialogTitle>
        <DialogContent>
          App requires access to your camera and microphone.{' '}
          {browser.getBrowserName() !== 'Safari' && (
            <Typography>
              Click the camera blocked icon{' '}
              <img
                alt='icon'
                src={'https://www.gstatic.com/meet/ic_blocked_camera_dark_f401bc8ec538ede48315b75286c1511b.svg'}
                style={{ display: 'inline' }}
              />{' '}
              in your browser's address bar.
            </Typography>
          )}
        </DialogContent>
        {_renderErrorMessage()}
        {_renderTryAgain()}
      </div>
    )
  }

  const _renderSystemDeniedDialog = () => {
    const settingsDataByOS: any = {
      macOS: {
        name: 'System Preferences',
        link: 'x-apple.systempreferences:com.apple.preference.security?Privacy_Camera'
      }
    }

    return (
      <div>
        <DialogTitle>Can't use your camera or microphone</DialogTitle>
        <DialogContent>
          Your browser might not have access to your camera or microphone. To fix this problem, open{' '}
          {settingsDataByOS[browser.getOSName()] ? (
            <Link
              onClick={() => {
                window.open(settingsDataByOS[browser.getOSName()].link, '_blank')
              }}
            >
              {settingsDataByOS[browser.getOSName()].name}
            </Link>
          ) : (
            'Settings'
          )}
          .
        </DialogContent>
        {_renderErrorMessage()}
        {_renderTryAgain()}
      </div>
    )
  }

  const _renderTrackErrorDialog = () => {
    return (
      <div>
        <DialogTitle variant='h5'>Can't start your camera or microphone</DialogTitle>
        <DialogContent>
          Another application (Zoom, Webex) or browser tab (Google Meet, Messenger Video) might already be using your
          webcam. Please turn off other cameras before proceeding.
        </DialogContent>
        {_renderErrorMessage()}
        {_renderTryAgain()}
      </div>
    )
  }

  const _renderDialogContent = () => {
    switch (showDialog) {
      case DialogType.explanation:
        return _renderExplanationDialog()
      case DialogType.systemDenied:
        return _renderSystemDeniedDialog()
      case DialogType.userDenied:
        return _renderUserDeniedDialog()
      case DialogType.trackError:
        return _renderTrackErrorDialog()
    }
  }

  return <Dialog open={!!showDialog}>{showDialog && _renderDialogContent()}</Dialog>
}

export default DialogMediaOnboarding
