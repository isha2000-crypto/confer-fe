// ** MUI Imports
// import Card from '@mui/material/Card'
// import Grid from '@mui/material/Grid'
// import Typography from '@mui/material/Typography'
// import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'

// const HomePage = () => {
//   console.log('here coming')

//   return (
//     <Grid container spacing={6}>
//       <Grid item xs={12}>
//         <Card>
//           <CardHeader title='Kick start your project 🚀'></CardHeader>
//           <CardContent>
//             <Typography sx={{ mb: 2 }}>All the best for your new project.</Typography>
//             <Typography>
//               Please make sure to read our Template Documentation to understand where to go from here and how to use our
//               template.
//             </Typography>
//           </CardContent>
//         </Card>
//       </Grid>
//       <Grid item xs={12}>
//         <Card>
//           <CardHeader title='ACL and JWT 🔒'></CardHeader>
//           <CardContent>
//             <Typography sx={{ mb: 2 }}>
//               Access Control (ACL) and Authentication (JWT) are the two main security features of our template and are
//               implemented in the starter-kit as well.
//             </Typography>
//             <Typography>Please read our Authentication and ACL Documentations to get more out of them.</Typography>
//           </CardContent>
//         </Card>
//       </Grid>
//     </Grid>
//   )
// }

// export default HomePage

// import { useReactMediaRecorder } from 'react-media-recorder'

// const {useReactMediaRecorder} = dynamic(()=> import('react-media-recorder'), {ssr: false});
// const VideoRecorder = dynamic(() => import('react-video-recorder',{ssr: false});
// const {useRecordWebcam} = dynamic(()=> import('react-record-webcam',{ssr: false});
// const VideoRecorder = dynamic(() => import('react-video-recorder'), {
//   ssr: false
// })

// const { useRecordWebcam } = dynamic(() => import('react-record-webcam'), {
//   ssr: false
// })

// const { useReactMediaRecorder } = dynamic(() => import('react-media-recorder'), {
//   ssr: false
// })

//import VideoRecorder from 'react-video-recorder/dist/components/VideoRecorder'
// import { useRecordWebcam } from 'react-record-webcam'

// const OPTIONS = {
//   filename: 'test-filename',
//   fileType: 'mp4',
//   width: 1920,
//   height: 1080
// }
// const RecordView = () => {
//   const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ video: true })

//   return (
//     <div>
//       <p>{status}</p>
//       <button onClick={startRecording}>Start Recording</button>
//       <button onClick={stopRecording}>Stop Recording</button>
//       <video src={mediaBlobUrl} controls autoPlay loop />
//     </div>
//   )
// }

import dynamic from 'next/dynamic'

const VideoRecorder = dynamic(() => import('../../components/molecules/VideoRecorder'))

const HomePage = () => {
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
export default HomePage
export {}
