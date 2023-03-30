/* eslint-disable react-hooks/exhaustive-deps */
import { Assessment, Task } from '@custom-types/assessmentsType'
import { Grid, Card, CardContent, Typography, CardHeader } from '@mui/material'
import Icon from 'src/@core/components/icon'
import React from 'react'
import Timeline from 'src/containers/atoms/timeline'
import Webcam from 'react-webcam'
import { useState, useRef } from 'react'
import DialogAction from '@components/molecules/Dialog/DialogAction'
import IconButton from '@mui/material/IconButton'
import CardVideoStatus from '@components/molecules/CardVideoStatus'
import PermissionDeniedFallback from './PermissionDeniedFallback'
import { uploadFile } from 'src/lib/api/FileUpload'
import { useAuth } from 'src/hooks/useAuth'
import { UserDataType } from '@custom-types/contextTypes'
import DialogSubmissionComplete from '@components/molecules/Dialog/DialogSubmissionComplete'
import { useMutation } from '@apollo/client'
import { CREATE_ASSESSMENT_SUBMISSION } from 'src/lib/graphql/Mutation'
import { useRouter } from 'next/router'
import classnames from './ContainerVideoRecorder.module.scss'
import { useTheme } from '@mui/material'
import IconButtonTimeRemaining from '@components/molecules/Progress/IconButtonTimeRemaining'

interface props {
  assessment: Assessment
}

function ContainerVideoRecorder({ assessment }: props) {
  const theme = useTheme()
  const videoConstraints: MediaTrackConstraints = {
    width: 1920,
    height: 1080,
    facingMode: 'user',
    echoCancellation: true
  }
  const webcamRef: any = React.useRef(null)
  const mediaRecorderRef: any = React.useRef(null)
  const [fullScreen, setFullScreen] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [allowed, setAllowed] = React.useState(true)
  const [startedCapture, setStartedCapture] = React.useState(false)
  const [capturing, setCapturing] = React.useState(false)
  const [recordedChunks, setRecordedChunks] = React.useState([])
  const [currentTask, setCurrentTask] = React.useState<Task>(assessment?.tasks[0])
  const [currentCheckPoint, setCurrentCheckpoint] = React.useState<number>(0)
  const [timeRemaining, setTimeRemaining] = useState(currentTask?.duration)
  const [retakePopup, setRetakePopup] = useState<boolean>(false)
  const [submitPopup, setSubmitPopup] = useState<boolean>(false)
  const [allSubmitPopup, setAllSubmittedPopup] = useState<boolean>(false)
  const [recordings, setRecordings] = useState<any>({})
  const [allUploaded, setAllUploaded] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const router = useRouter()
  const [createAssessment] = useMutation(CREATE_ASSESSMENT_SUBMISSION)
  const auth = useAuth()
  React.useEffect(() => {
    if (!recordings.length) {
      const recordingData: any = {}
      assessment.tasks.forEach(task => {
        recordingData[task._id] = {
          _id: task._id,
          status: 'open',
          videoUrl: null
        }
      })
      setRecordings(recordingData)
    }
  }, [assessment])

  const handlePointClick = (index: number) => {
    const taskId = assessment.tasks[index]._id
    if (recordings[taskId].status === 'open') {
      setCurrentCheckpoint(index)
      setCurrentTask(assessment.tasks[index])
      setTimeRemaining(assessment.tasks[index].duration)
    }
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
    setStartedCapture(true)
    setTimeout(() => {
      setStartedCapture(false)
      setCapturing(true)

      // handleRecording(true)
      // setTimeRemaining(timeoutDuration)
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: 'video/webm'
      })
      mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable)
      mediaRecorderRef.current.start()
      startTimer()
    }, 3000)
  }, [handleDataAvailable])

  const handleStopCaptureClick = React.useCallback(() => {
    clearInterval(timerRef.current)
    mediaRecorderRef.current.stop()
    setCapturing(false)

    // handleRecording(false)
  }, [mediaRecorderRef, setCapturing])

  const handleUserMediaError = React.useCallback(() => {
    setAllowed(false)
    setLoading(false)
  }, [])

  const handleUserMediaCreated = React.useCallback(() => {
    setAllowed(true)
    setLoading(false)
  }, [])

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
    setTimeRemaining(currentTask?.duration)
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

  const handleRecordingSubmit = async () => {
    const blob = new Blob([...recordedChunks], {
      type: 'video/mp4'
    })
    const video = document.createElement('video')
    video.src = URL.createObjectURL(blob)

    video.addEventListener('loadedmetadata', () => {
      console.log('Video Duration: ', video.duration)
    })
    setRecordedChunks([])
    try {
      setRecordings((prev: any) => ({
        ...prev,
        [currentTask._id]: {
          _id: currentTask._id,
          status: 'uploading',
          videoUrl: null
        }
      }))
      const taskIndex = assessment.tasks.findIndex(task => task._id === currentTask._id)
      if (taskIndex >= 0 && assessment.tasks[taskIndex + 1]) {
        handlePointClick(taskIndex + 1)
      } else {
        openSubmitPopup()
      }
      const url = await uploadFile(blob, auth?.user as UserDataType, assessment, currentTask._id)
      setRecordings((prev: any) => ({
        ...prev,
        [currentTask._id]: {
          _id: currentTask._id,
          status: 'submitted',
          videoUrl: url
        }
      }))
    } catch (err) {
      console.log(err)
    }
  }

  const openSubmitPopup = async () => {
    setAllSubmittedPopup(true)
  }

  const handleFullScreen = () => {
    setFullScreen(prev => !prev)
  }

  const getProgressValue = () => {
    return (timeRemaining / currentTask.duration) * 100
  }

  React.useEffect(() => {
    const submitAssessment = async () => {
      const responseArray = Object.values(recordings)
      const inputData = {
        userId: auth?.user?.id,
        assessmentId: assessment._id,
        taskResponses: responseArray.map((res: any) => {
          return {
            taskId: res._id,
            videoUrl: res.videoUrl
          }
        })
      }

      const result = await createAssessment({
        variables: {
          createSubmittedAssessmentInput: inputData
        }
      })

      console.log('Submitted Assessment result', result)
      if (result.data) {
        setSubmitted(true)
        router.push(`/assessments/submitted/${result.data.createSubmittedAssessment._id}`)
      }
    }
    if (Object.keys(recordings).length) {
      console.log('Running when submitted')
      const taskIds = Object.keys(recordings)
      let done = true
      if (taskIds.length > 0) {
        taskIds.forEach(tid => {
          if (recordings[tid].status !== 'submitted') done = false
        })
      } else {
        done = false
      }
      if (done) {
        submitAssessment()
      }
    }
  }, [allUploaded])

  React.useEffect(() => {
    const taskIds = Object.keys(recordings)
    let done = true
    if (taskIds.length > 0) {
      taskIds.forEach(tid => {
        if (recordings[tid].status !== 'submitted') done = false
      })
    } else {
      done = false
    }
    if (done) {
      setAllUploaded(true)
    }
  }, [recordings])

  if (allowed === false) {
    return <PermissionDeniedFallback />
  }

  return (
    <>
      {/* {!loading && <CardHeader title={assessment.title}></CardHeader>} */}
      <Card className={classnames.timeline_wrapper}>
        <div className='timelineContainer'>
          {!loading && (
            <Timeline
              recordings={recordings}
              tasks={assessment?.tasks}
              totalCheckPoints={assessment?.tasks.length}
              currentCheckPoint={currentCheckPoint}
              handlePointClick={handlePointClick}
            />
          )}
        </div>
      </Card>

      <Grid container sx={{ height: '83vh', flexWrap: 'nowrap' }} padding={3} className={classnames.animater_wrapper}>
        <Grid
          item
          spacing={2}
          padding={'0 2rem'}
          xs={fullScreen ? 12 : 9}
          style={{
            transition: theme.transitions.create('all', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen
            })
          }}
        >
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
                  <div
                    className={classnames.video_controls}
                    style={{
                      background: startedCapture ? 'cornsilk' : 'none',
                      opacity: startedCapture ? '0.5' : '1'
                    }}
                  >
                    <div className={classnames.upper_control_bar}>
                      <IconButton color={'primary'} onClick={handleFullScreen}>
                        <Icon icon='mdi:fit-to-screen' fontSize={50} />
                      </IconButton>
                    </div>
                    {!capturing && !startedCapture && (
                      <div>
                        Hit <span className={classnames.record_label}>RECORD</span> to start
                      </div>
                    )}
                    {startedCapture && <div className={classnames.get_ready_text}>Get Ready</div>}
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
                        <IconButton
                          color={'error'}
                          onClick={handleStartCaptureClick}
                          disabled={recordedChunks.length != 0}
                        >
                          <Icon
                            icon='mdi:record'
                            fontSize={100}
                            color={recordedChunks.length != 0 ? 'grey' : undefined}
                          />
                        </IconButton>
                      )
                    )}
                  </div>
                </>
              )}
              {recordedChunks.length > 0 && (
                <>
                  <video className={classnames.video_ready_player} muted={false}>
                    {recordedChunks.map((chunk, index) => (
                      <source key={index} src={URL.createObjectURL(chunk)} />
                    ))}
                  </video>
                  <div className={classnames.video_controls_completed}>
                    {!capturing && recordedChunks.length > 0 && (
                      <>
                        <IconButton
                          color={recordedChunks.length > 0 && !capturing ? 'primary' : 'secondary'}
                          onClick={handleRetakeClick}
                          disabled={recordedChunks.length == 0}
                        >
                          <Icon
                            icon='mdi:refresh'
                            fontSize={100}
                            color={recordedChunks.length == 0 ? 'grey' : undefined}
                          />
                        </IconButton>
                        <IconButton disabled={recordedChunks.length == 0} color='primary' onClick={handleSubmitTask}>
                          <Icon
                            icon='mdi:tick'
                            fontSize={100}
                            color={recordedChunks.length == 0 ? 'grey' : undefined}
                          />
                        </IconButton>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
            {/* {!loading && (
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
            )} */}
          </Grid>
        </Grid>

        {!loading && !fullScreen && (
          <Grid
            item
            xs={3}
            style={{
              transition: theme.transitions.create('all', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
              })
            }}
          >
            <Card className={`questionContainer`}>
              <Card className='questionNumberCard' color='primary'>
                <Typography className='questionNumberCard-paragraph' paragraph={true}>
                  {`Question ${assessment.tasks.findIndex(it => it._id === currentTask._id) + 1}/${
                    assessment.tasks.length
                  }`}
                </Typography>
              </Card>
              <CardContent>
                <Card className='questionCard'>
                  <CardContent>
                    <Typography className='questionCard-paragraph' paragraph={true}>
                      {currentTask.description}
                    </Typography>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </Grid>
        )}
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
      <DialogSubmissionComplete
        title='Please wait for all video submissions.'
        text='Assessment is being submitted, Please wait'
        open={allSubmitPopup}
        allUploaded={allUploaded}
        completed={submitted}
        setOpen={setAllSubmittedPopup}
      />
    </>
  )
}

export default ContainerVideoRecorder
