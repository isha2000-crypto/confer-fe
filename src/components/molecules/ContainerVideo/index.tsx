import { Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import Webcam from 'react-webcam'
import IconButtonTimeRemaining from '../Progress/IconButtonTimeRemaining'
import Icon from 'src/@core/components/icon'
import classnames from './ContainerVideo.module.scss'
import DialogAction from '../Dialog/DialogAction'
import SelfieSegmentationMediapipe from './SelfieSegmentationMediapipe'
import FilterMenu from './FilterMenu'
import { VideoFilter } from '@custom-types/enum'
import VideoPlayer from '../VideoPlayer'

interface Props {
  currentTask: any
  handleUserMediaError: any
  handleUserMediaCreated: any
  handleFullScreen: any
  handleTaskUpload: any
}

const videoConstraints: MediaTrackConstraints = {
  width: 1920,
  height: 1080,
  facingMode: 'user',
  echoCancellation: true
}

function ContainerVideo({
  currentTask,
  handleUserMediaError,
  handleUserMediaCreated,
  handleFullScreen,
  handleTaskUpload
}: Props) {
  // React Refs
  const webcamRef: any = React.useRef(null)
  const mediaRecorderRef: any = React.useRef(null)
  const canvasRef: any = React.useRef(null)
  const timerRef: any = React.useRef(null)
  const countDownRef: any = React.useRef(null)

  // React States
  const [recordedChunks, setRecordedChunks] = React.useState([])
  const [startedCapture, setStartedCapture] = React.useState(false)
  const [capturing, setCapturing] = React.useState(false)
  const [timeRemaining, setTimeRemaining] = React.useState(currentTask?.duration)
  const [retakePopup, setRetakePopup] = React.useState<boolean>(false)
  const [submitPopup, setSubmitPopup] = React.useState<boolean>(false)
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null)
  const [filterType, setFilterType] = React.useState<VideoFilter>(VideoFilter.NONE)
  const [imageUrl, setImageUrl] = React.useState<string | null>(null)
  const [counter, setCounter] = React.useState<number>(3)

  //Handler Functions
  const handleMenuOpenClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget)
  }

  const handleFilterClick = (value: VideoFilter, imageUrl: string | null) => {
    setFilterType(value)
    setImageUrl(imageUrl)
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

  const startTimer = () => {
    const timer = setInterval(() => {
      setTimeRemaining((time: number) => time - 1)
    }, 1000)
    timerRef.current = timer
  }

  const startCountdown = () => {
    const countdown = setInterval(() => {
      setCounter(count => count - 1)
    }, 1000)
    countDownRef.current = countdown
  }

  const handleStartCaptureClick = React.useCallback(() => {
    setCounter(3)
    setStartedCapture(true)
    startCountdown()
    setTimeout(() => {
      setStartedCapture(false)
      setCapturing(true)
      clearInterval(countDownRef.current)
      const audioTrack = webcamRef.current.stream.getAudioTracks()[0]
      const canvasStream = canvasRef.current.captureStream(60)
      canvasStream.addTrack(audioTrack)
      mediaRecorderRef.current = new MediaRecorder(canvasStream, {
        mimeType: 'video/webm'
      })
      mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable)
      mediaRecorderRef.current.start()
      startTimer()
    }, 3000)
  }, [handleDataAvailable])

  const handleStopCaptureClick = React.useCallback(async () => {
    clearInterval(timerRef.current)
    mediaRecorderRef.current.stop()
    setCapturing(false)
  }, [mediaRecorderRef, setCapturing])

  const handleRetakeClick = () => {
    if (!capturing && recordedChunks.length > 0) setRetakePopup(true)
  }

  const handleSubmitTask = () => {
    setSubmitPopup(true)
  }

  const handleRetake = () => {
    if (recordedChunks.length == 0 || capturing) return
    setRecordedChunks([])
    setTimeRemaining(currentTask?.duration)
  }

  const getProgressValue = () => {
    return (timeRemaining / currentTask.duration) * 100
  }

  const handleRecordingSubmit = () => {
    const blob = new Blob([...recordedChunks], {
      type: 'video/mp4'
    })
    setRecordedChunks([])
    handleTaskUpload(blob)
  }

  // React Effects
  React.useEffect(() => {
    if (timeRemaining === 0) {
      handleStopCaptureClick()
    }
  }, [timeRemaining, handleStopCaptureClick])

  React.useEffect(() => {
    if (currentTask) {
      setTimeRemaining(currentTask?.duration)
    }
  }, [currentTask])

  return (
    <>
      <Grid
        container
        gap={20}
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <div className={classnames.video_wrapper}>
          {recordedChunks.length == 0 && (
            <>
              <Webcam
                className={classnames.video_component}
                audio={true}
                muted={true}
                ref={webcamRef}
                videoConstraints={videoConstraints}
                onUserMediaError={handleUserMediaError}
                onUserMedia={handleUserMediaCreated}
              />
              <SelfieSegmentationMediapipe
                inputVideoRef={webcamRef}
                canvasRef={canvasRef}
                className={classnames.video_component}
                filterType={filterType}
                imageUrl={imageUrl}
              />
              <div
                className={classnames.video_controls}
                style={{
                  background: startedCapture ? 'white' : 'none',
                  opacity: startedCapture ? '0.7' : '1'
                }}
              >
                <div className={classnames.upper_control_bar}>
                  <IconButton color={'primary'} onClick={handleFullScreen}>
                    <Icon icon='mdi:fit-to-screen' fontSize={50} />
                  </IconButton>
                  <IconButton color={'primary'} onClick={handleMenuOpenClick}>
                    <Icon icon='mdi:creation' fontSize={50} />
                  </IconButton>
                  <FilterMenu
                    filterType={filterType}
                    menuAnchor={menuAnchor}
                    setMenuAnchor={setMenuAnchor}
                    handleMenuClick={handleFilterClick}
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                  />
                </div>
                {!capturing && !startedCapture && (
                  <div>
                    Hit <span className={classnames.record_label}>RECORD</span> to start
                  </div>
                )}
                {startedCapture && (
                  <div id='countdown-wrapper' className={classnames.get_ready_text}>
                    <span id='countdown' className={classnames.get_ready_countdown}>
                      {counter}
                    </span>
                  </div>
                )}
                {capturing ? (
                  <>
                    <Typography
                      variant='h5'
                      color={timeRemaining <= 30 ? (timeRemaining % 2 == 0 ? '#FDB528' : 'error') : 'error'}
                    >
                      &#128308;{new Date(timeRemaining * 1000).toISOString().substring(14, 19)}
                    </Typography>
                    <IconButtonTimeRemaining
                      timeRemaining={timeRemaining}
                      value={getProgressValue()}
                      handleClick={handleStopCaptureClick}
                    />
                  </>
                ) : (
                  !startedCapture && (
                    <IconButton color={'error'} onClick={handleStartCaptureClick} disabled={recordedChunks.length != 0}>
                      <Icon icon='mdi:record' fontSize={100} color={recordedChunks.length != 0 ? 'grey' : undefined} />
                    </IconButton>
                  )
                )}
              </div>
            </>
          )}
          {recordedChunks.length > 0 && (
            <>
              <VideoPlayer id={`${recordedChunks.length}`}>
                {recordedChunks.map((chunk, index) => (
                  <source key={index} src={URL.createObjectURL(chunk)} />
                ))}
              </VideoPlayer>
              <div className={classnames.video_controls_completed}>
                {!capturing && recordedChunks.length > 0 && (
                  <>
                    <IconButton
                      color={recordedChunks.length > 0 && !capturing ? 'primary' : 'secondary'}
                      onClick={handleRetakeClick}
                      disabled={recordedChunks.length == 0}
                    >
                      <Icon icon='mdi:refresh' fontSize={100} color={recordedChunks.length == 0 ? 'grey' : undefined} />
                    </IconButton>
                    <IconButton disabled={recordedChunks.length == 0} color='primary' onClick={handleSubmitTask}>
                      <Icon icon='mdi:tick' fontSize={100} color={recordedChunks.length == 0 ? 'grey' : undefined} />
                    </IconButton>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </Grid>
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
        handleAgree={handleRecordingSubmit}
        agreeText='Submit'
      />
    </>
  )
}

export default ContainerVideo
