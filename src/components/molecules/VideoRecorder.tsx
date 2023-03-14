// import Head from 'next/head'
// import Image from 'next/image'

// import Webcam from 'react-webcam'
// import { useRef, useCallback } from 'react'
// import React from 'react'

// export default function MediaRecorder() {
//   const videoConstraints = {
//     width: 1280,
//     height: 720,
//     facingMode: true,
//     mirrored: false,
//     echoCancellation: true
//   }
//   const webcamRef = useRef(null)
//   const mediaRecorderRef = React.useRef(null)
//   const [capturing, setCapturing] = React.useState(false)
//   const [recordedChunks, setRecordedChunks] = React.useState([])
//   const handleStartCaptureClick = React.useCallback(() => {
//     setCapturing(true)
//     const stream = webcamRef.current?.stream
//     if (stream) {
//       mediaRecorderRef.current = new MediaRecorder(stream, {
//         mimeType: 'video/webm'
//       })
//       mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable)
//       mediaRecorderRef.current.start()
//     }

//     // mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
//     //   mimeType: 'video/webm'
//     // })
//     mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable)
//     mediaRecorderRef.current.start()
//   }, [webcamRef, setCapturing, mediaRecorderRef])
//   const handleDataAvailable = React.useCallback(
//     ({ data }) => {
//       if (data.size > 0) {
//         setRecordedChunks(prev => prev.concat(data))
//       }
//     },
//     [setRecordedChunks]
//   )
//   const handleStopCaptureClick = React.useCallback(() => {
//     mediaRecorderRef.current.stop()
//     setCapturing(false)
//   }, [mediaRecorderRef, webcamRef, setCapturing])
//   const handleDownload = React.useCallback(() => {
//     if (recordedChunks.length) {
//       const blob = new Blob(recordedChunks, {
//         type: 'video/mp4'
//       })
//       const url = URL.createObjectURL(blob)
//       const a = document.createElement('a')
//       document.body.appendChild(a)
//       a.style = 'display: none'
//       a.href = url
//       a.download = 'react-webcam-stream-capture.mp4'
//       a.click()
//       window.URL.revokeObjectURL(url)
//       setRecordedChunks([])
//     }
//   }, [recordedChunks])

//   return (
//     <>
//       <Webcam audio={false} ref={webcamRef} videoConstraints={videoConstraints} mirrored />
//       {capturing ? (
//         <button onClick={handleStopCaptureClick}>Stop Capture</button>
//       ) : (
//         <button onClick={handleStartCaptureClick}>Start Capture</button>
//       )}
//       {recordedChunks.length > 0 && <button onClick={handleDownload}>Download</button>}
//     </>
//   )
// }
// import Head from 'next/head'
// import Image from 'next/image'

//import styles from '../styles/Home.module.css'
import Webcam from 'react-webcam'

// import { useState, useRef, useCallback } from 'react'
import React from 'react'

const VideoRecorder = () => {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: true,
    mirrored: false,
    echoCancellation: true
  }
  const webcamRef = React.useRef(null)
  const mediaRecorderRef = React.useRef(null)
  const [capturing, setCapturing] = React.useState(false)
  const [recordedChunks, setRecordedChunks] = React.useState([])
  const [recordingTime, setRecordingTime] = React.useState(0)
  const [isPreviewing, setIsPreviewing] = React.useState(false)
  const duration = 10
  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true)
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm'
    })
    mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable)

    mediaRecorderRef.current.start()

    //mediaRecorderRef.current.start(10000)
    const duration = 10
    const intervalId = setInterval(() => {
      setRecordingTime(prevTime => {
        const newTime = prevTime + 1
        if (newTime >= duration) {
          clearInterval(intervalId)
          mediaRecorderRef.current.stop()
          setCapturing(false)
        }

        return newTime
      })
    }, 1000)
  }, [webcamRef, setCapturing, mediaRecorderRef])
  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks(prev => prev.concat(data))
      }
    },
    [setRecordedChunks]
  )
  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current?.stop()
    setCapturing(false)
  }, [mediaRecorderRef, webcamRef, setCapturing])
  const handleDownload = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/mp4'
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      document.body.appendChild(a)
      a.style = 'display: none'
      a.href = url
      a.download = 'react-webcam-stream-capture.mp4'
      a.click()
      window.URL.revokeObjectURL(url)
      setRecordedChunks([])
    }
  }, [recordedChunks])

  // const handleRetakeClick = () => {
  //   setRecordedChunks([])
  //   handleStartCaptureClick()
  // }

  return (
    <>
      <Webcam audio={true} ref={webcamRef} videoConstraints={videoConstraints} mirrored />
      {capturing ? (
        <>
          <div>Recording... {duration - recordingTime} seconds remaining</div>
          <button onClick={handleStopCaptureClick}>Stop Capture</button>
        </>
      ) : (
        <button onClick={handleStartCaptureClick}>Start Capture</button>
      )}
      {recordedChunks.length > 0 && <button onClick={handleDownload}>Download</button>}
      {/* <button onClick={handleRetakeClick}>Retake</button> */}
    </>
  )
}

export default VideoRecorder
