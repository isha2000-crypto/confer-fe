import { Assessment, Task } from '@custom-types/assessmentsType'
import { Grid, Card, CardContent, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'
import React from 'react'
import Timeline from 'src/containers/atoms/timeline'
import Webcam from 'react-webcam'
import { useState, useRef } from 'react'
import DialogAction from '@components/molecules/Dialog/DialogAction'
import IconButton from '@mui/material/IconButton'
import CardVideoStatus from '@components/molecules/CardVideoStatus'

interface props {
  assessment: Assessment
}

function ContainerVideoRecorder({ assessment }: props) {
  const videoConstraints: MediaTrackConstraints = {
    width: 1920,
    height: 1080,
    facingMode: 'user',
    echoCancellation: true
  }
  const webcamRef: any = React.useRef(null)
  const mediaRecorderRef: any = React.useRef(null)
  const [capturing, setCapturing] = React.useState(false)
  const [recordedChunks, setRecordedChunks] = React.useState([])
  const [currentTask, setCurrentTask] = React.useState<Task>(assessment?.tasks[0])
  const [currentCheckPoint, setCurrentCheckpoint] = React.useState<number>(0)
  const [timeRemaining, setTimeRemaining] = useState(currentTask?.duration)
  const [retakePopup, setRetakePopup] = useState<boolean>(false)
  const [submitPopup, setSubmitPopup] = useState<boolean>(false)

  const handlePointClick = (index: number) => {
    setCurrentCheckpoint(index)
    setCurrentTask(assessment.tasks[index])
    setTimeRemaining(assessment.tasks[index].duration)
  }

  const handleDataAvailable = React.useCallback(
    ({ data }: any) => {
      if (data.size > 0) {
        setRecordedChunks(prev => prev.concat(data))
      }
      if (mediaRecorderRef.current.state === 'inactive') {
        mediaRecorderRef.current.removeEventListener('dataavailable', handleDataAvailable)
      }
    },
    [setRecordedChunks, mediaRecorderRef]
  )

  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true)

    // handleRecording(true)
    // setTimeRemaining(timeoutDuration)
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm'
    })
    mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable)
    mediaRecorderRef.current.start()
    startTimer()
  }, [handleDataAvailable])

  const handleStopCaptureClick = React.useCallback(() => {
    clearInterval(timerRef.current)
    mediaRecorderRef.current.stop()
    setCapturing(false)

    // handleRecording(false)
  }, [mediaRecorderRef, setCapturing])

  // const handleDownload = React.useCallback(() => {
  //   if (recordedChunks.length) {
  //     const blob = new Blob(recordedChunks, {
  //       type: 'video/mp4'
  //     })
  //     const url = URL.createObjectURL(blob)
  //     const a = document.createElement('a')
  //     document.body.appendChild(a)

  //     // a.style = 'display: none'
  //     a.href = url
  //     a.download = 'react-webcam-stream-capture.mp4'
  //     a.click()
  //     window.URL.revokeObjectURL(url)
  //     setRecordedChunks([])
  //   }
  // }, [recordedChunks])

  const handleRetakeClick = () => {
    if (!capturing && recordedChunks.length > 0) setRetakePopup(true)
  }

  const handleSubmitTask = () => {
    setSubmitPopup(true)
  }

  const handleRetake = () => {
    if (recordedChunks.length == 0 || capturing) return
    setRecordedChunks([])
  }

  const startTimer = () => {
    const timer = setInterval(() => {
      setTimeRemaining(time => time - 1)
    }, 1000)
    timerRef.current = timer
  }

  const timerRef: any = useRef(null)

  React.useEffect(() => {
    if (timeRemaining === 0) {
      handleStopCaptureClick()
    }
  }, [timeRemaining, handleStopCaptureClick])

  return (
    <Grid container sx={{ flexWrap: 'wrap', height: '100%' }} spacing={6} columnGap={6}>
      <Grid item xs={12}>
        <Grid
          container
          gap={20}
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            height: '52vh'
          }}
        >
          {recordedChunks.length == 0 && (
            <Webcam
              audio={true}
              muted={true}
              ref={webcamRef}
              videoConstraints={videoConstraints}
              mirrored
              width={'47%'}
              height={'480px'}
            />
          )}
          {recordedChunks.length > 0 && (
            <>
              <video className='video-js' controls muted={false} width='47%%' height='480px' data-setup='{}'>
                {recordedChunks.map((chunk, index) => (
                  <source key={index} src={URL.createObjectURL(chunk)} />
                ))}
              </video>
            </>
          )}

          <Grid container sx={{ display: 'flex', flexDirection: 'column', width: '20%' }} spacing={5}>
            <Grid item xs={12}>
              <CardVideoStatus
                text={mediaRecorderRef?.current?.state?.toUpperCase() ?? 'INACTIVE'}
                title={'STATUS'}
                icon={<Icon icon={capturing ? 'mdi:record' : 'mdi-stop'} fontSize={30} />}
                color={capturing ? 'error' : 'secondary'}
              />
            </Grid>
            <Grid item xs={12}>
              <CardVideoStatus
                text={`${new Date(timeRemaining * 1000).toISOString().substring(14, 19)}`}
                title={'Time Remaining'}
                icon={<Icon icon={'mdi:clock'} fontSize={30} />}
                color={capturing ? 'primary' : 'secondary'}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Card className='questionContainer'>
          <CardContent>
            <div className='timelineContainer' style={{ width: '100%' }}>
              <Timeline
                totalCheckPoints={assessment?.tasks.length}
                currentCheckPoint={currentCheckPoint}
                handlePointClick={handlePointClick}
              />
            </div>
            <Card className='questionCard'>
              <CardContent>
                <Typography paragraph={true}>{currentTask.description}</Typography>
              </CardContent>
            </Card>
            <div className='buttonsContainer'>
              <IconButton
                color={recordedChunks.length > 0 && !capturing ? 'primary' : 'secondary'}
                onClick={handleRetakeClick}
                disabled={recordedChunks.length == 0}
              >
                <Icon icon='mdi:refresh' fontSize={30} color={recordedChunks.length == 0 ? 'grey' : undefined} />
              </IconButton>
              {capturing ? (
                <IconButton color={'error'} onClick={handleStopCaptureClick}>
                  <Icon icon='mdi:stop' fontSize={30} />
                </IconButton>
              ) : (
                <IconButton color={'error'} onClick={handleStartCaptureClick} disabled={recordedChunks.length != 0}>
                  <Icon icon='mdi:play' fontSize={30} color={recordedChunks.length != 0 ? 'grey' : undefined} />
                </IconButton>
              )}
              <IconButton disabled={recordedChunks.length == 0} color='primary' onClick={handleSubmitTask}>
                <Icon icon='mdi:tick' fontSize={30} color={recordedChunks.length == 0 ? 'grey' : undefined} />
              </IconButton>
              <DialogAction
                title='Confirm Retake of Video?'
                text='Are you sure you want to discard current video and go for retake?'
                open={retakePopup}
                setOpen={setRetakePopup}
                handleAgree={handleRetake}
                agreeText='Retake'
              />
              <DialogAction
                title='Confirm Submission of Video?'
                text='Once video for task is submitted, you cannot go back!'
                open={submitPopup}
                setOpen={setSubmitPopup}
                handleAgree={() => setSubmitPopup(false)}
                agreeText='Submit'
              />
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ContainerVideoRecorder
