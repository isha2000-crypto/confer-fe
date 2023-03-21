/* eslint-disable react-hooks/exhaustive-deps */
import Webcam from 'react-webcam'
import { useState, useRef } from 'react'
import React from 'react'

interface props {
  timeoutDuration: number
  recording: boolean
}

const VideoRecorder = ({ timeoutDuration }: props) => {
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
  const [timeRemaining, setTimeRemaining] = useState(timeoutDuration)

  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true)

    // handleRecording(true)
    setTimeRemaining(timeoutDuration)
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm'
    })
    mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable)
    mediaRecorderRef.current.start()
    startTimer()
  }, [webcamRef, setCapturing, mediaRecorderRef, setTimeRemaining])

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

  const handleStopCaptureClick = React.useCallback(() => {
    clearInterval(timerRef.current)
    mediaRecorderRef.current.stop()
    setCapturing(false)

    // handleRecording(false)
  }, [mediaRecorderRef, webcamRef, setCapturing])

  const handleDownload = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/mp4'
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      document.body.appendChild(a)

      // a.style = 'display: none'
      a.href = url
      a.download = 'react-webcam-stream-capture.mp4'
      a.click()
      window.URL.revokeObjectURL(url)
      setRecordedChunks([])
    }
  }, [recordedChunks])

  const handleRetake = () => {
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

  // React.useEffect(() => {
  //   if (capturing != recording) {
  //     recording ? handleStartCaptureClick() : handleStopCaptureClick()
  //   }
  // }, [recording, handleStartCaptureClick, handleStopCaptureClick, capturing])

  return (
    <div
      style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'center', height: '52vh' }}
    >
      {recordedChunks.length == 0 && (
        <Webcam
          audio={true}
          muted={true}
          ref={webcamRef}
          videoConstraints={videoConstraints}
          mirrored
          width={'100%'}
          height={'480px'}
        />
      )}
      {capturing ? (
        <div>
          <div>Recording time left: {timeRemaining}</div>
          <button onClick={handleStopCaptureClick}>Stop Capture</button>
        </div>
      ) : (
        <button onClick={handleStartCaptureClick}>Start Capture</button>
      )}
      {recordedChunks.length > 0 && (
        <>
          <video controls muted={false} width='100%' height='480px'>
            {recordedChunks.map((chunk, index) => (
              <source key={index} src={URL.createObjectURL(chunk)} />
            ))}
          </video>
          <button onClick={handleDownload}>Download</button>
          <button onClick={handleRetake}>Retake</button>
        </>
      )}
    </div>
  )
}

export default VideoRecorder
