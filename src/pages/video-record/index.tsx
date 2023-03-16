import dynamic from 'next/dynamic'

const VideoRecorder = dynamic(() => import('../../components/molecules/VideoRecorder'))

const videoRec = () => {
  // const recordWebcam = useRecordWebcam(OPTIONS)
  // const getRecordingFileHooks = async () => {
  //   const blob = await recordWebcam.getRecording()
  //   console.log({ blob })
  // }

  // const getRecordingFileRenderProp = async blob => {
  //   console.log({ blob })
  // }

  return (
    <div>
      <h1> Video Recording </h1>
      {/* <RecordView />
      <h1>2.react-video-recorder</h1>
      <VideoRecorder
        onRecordingComplete={videoBlob => {
          // Do something with the video...
          console.log('videoBlob', videoBlob)
        }}
      /> */}
      <VideoRecorder />
      {/* <h1>3.react-record-webcam</h1>
      <p>Camera status: {recordWebcam.status}</p>
      <div>
        <button
          disabled={
            recordWebcam.status === 'OPEN' || recordWebcam.status === 'RECORDING' || recordWebcam.status === 'PREVIEW'
          }
          onClick={recordWebcam.open}
        >
          Open camera
        </button>
        <button
          disabled={recordWebcam.status === 'CLOSED' || recordWebcam.status === 'PREVIEW'}
          onClick={recordWebcam.close}
        >
          Close camera
        </button>
        <button
          disabled={
            recordWebcam.status === 'CLOSED' || recordWebcam.status === 'RECORDING' || recordWebcam.status === 'PREVIEW'
          }
          onClick={recordWebcam.start}
        >
          Start recording
        </button>
        <button disabled={recordWebcam.status !== 'RECORDING'} onClick={recordWebcam.stop}>
          Stop recording
        </button>
        <button disabled={recordWebcam.status !== 'PREVIEW'} onClick={recordWebcam.retake}>
          Retake
        </button>
        <button disabled={recordWebcam.status !== 'PREVIEW'} onClick={recordWebcam.download}>
          Download
        </button>
        <button disabled={recordWebcam.status !== 'PREVIEW'} onClick={getRecordingFileHooks}>
          Get recording
        </button>
      </div>

      <video
        ref={recordWebcam.previewRef}
        style={{
          display: `${recordWebcam.status === 'PREVIEW' ? 'block' : 'none'}`
        }}
        controls
      /> */}
    </div>
  )
}
export default videoRec
export {}
