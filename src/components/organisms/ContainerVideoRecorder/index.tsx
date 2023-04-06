/* eslint-disable react-hooks/exhaustive-deps */
import { Assessment, Task } from '@custom-types/assessmentsType'
import { Grid } from '@mui/material'
import React from 'react'
import Timeline from '@components/molecules/timeline'
import { useState } from 'react'
import PermissionDeniedFallback from './PermissionDeniedFallback'
import { useAuth } from 'src/hooks/useAuth'
import DialogSubmissionComplete from '@components/molecules/Dialog/DialogSubmissionComplete'
import { useMutation } from '@apollo/client'
import { CREATE_ASSESSMENT_SUBMISSION } from 'src/lib/graphql/Mutation'
import { useRouter } from 'next/router'
import classnames from './ContainerVideoRecorder.module.scss'
import { useTheme } from '@mui/material'
import { uploadFile } from 'src/lib/api/FileUpload'
import { UserDataType } from '@custom-types/contextTypes'
import ContainerQuestion from '@components/molecules/ContainerQuestions'
import ContainerVideo from '@components/molecules/ContainerVideo'
import { TaskStatus } from '@custom-types/enum'

interface props {
  assessment: Assessment
}

function ContainerVideoRecorder({ assessment }: props) {
  const theme = useTheme()
  const GridTransition = {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  }

  const [createAssessment] = useMutation(CREATE_ASSESSMENT_SUBMISSION)
  const [fullScreen, setFullScreen] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [allowed, setAllowed] = React.useState(true)
  const [currentTask, setCurrentTask] = React.useState<Task>(assessment?.tasks[0])
  const [currentCheckPoint, setCurrentCheckpoint] = React.useState<number>(0)
  const [allSubmitPopup, setAllSubmittedPopup] = useState<boolean>(false)
  const [recordings, setRecordings] = useState<any>({})
  const [allUploaded, setAllUploaded] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const router = useRouter()
  const auth = useAuth()

  const handleRecording = (_id: string, status: string, videoUrl: string | null) => {
    setRecordings((prev: any) => ({
      ...prev,
      [_id]: {
        _id,
        status,
        videoUrl
      }
    }))
  }

  const handlePointClick = (index: number) => {
    const taskId = assessment.tasks[index]._id
    if (recordings[taskId].status === TaskStatus.OPEN) {
      setCurrentCheckpoint(index)
      setCurrentTask(assessment.tasks[index])
    }
  }

  const handleUserMediaError = React.useCallback(() => {
    setAllowed(false)
    setLoading(false)
  }, [])

  const handleUserMediaCreated = React.useCallback(() => {
    setAllowed(true)
    setLoading(false)
  }, [])

  const openSubmitPopup = async () => {
    setAllSubmittedPopup(true)
  }

  const handleFullScreen = () => {
    setFullScreen(prev => !prev)
  }

  const handleTaskUpload = async (blob: Blob) => {
    try {
      handleRecording(currentTask._id, TaskStatus.UPLOADING, null)
      const taskIndex = assessment.tasks.findIndex(task => task._id === currentTask._id)
      if (taskIndex >= 0 && assessment.tasks[taskIndex + 1]) {
        handlePointClick(taskIndex + 1)
      } else {
        openSubmitPopup()
      }
      const url = await uploadFile(blob, auth?.user as UserDataType, assessment, currentTask._id)
      handleRecording(currentTask._id, TaskStatus.SUBMITTED, url)
    } catch (error) {
      console.log(error)
    }
  }

  const submitAssessment = async () => {
    const responseArray = Object.values(recordings)
    console.log('Assessment Submitting:', assessment)
    const inputData = {
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

    if (result.data) {
      setSubmitted(true)
      router.push(`/assessments/submitted/${result.data.createSubmittedAssessment._id}`)
    }
  }

  React.useEffect(() => {
    if (!recordings.length) {
      assessment.tasks.forEach(task => {
        handleRecording(task._id, TaskStatus.OPEN, null)
      })
    }
  }, [assessment])

  React.useEffect(() => {
    if (Object.keys(recordings).length) {
      const taskIds = Object.keys(recordings)
      let done = true
      if (taskIds.length > 0) {
        taskIds.forEach(tid => {
          if (recordings[tid].status !== TaskStatus.SUBMITTED) done = false
        })
      } else {
        done = false
      }
      if (done) {
        submitAssessment()
        setAllUploaded(true)
      }
    }
  }, [recordings])

  if (allowed === false) {
    return <PermissionDeniedFallback />
  }

  return (
    <>
      {!loading && (
        <Timeline
          recordings={recordings}
          tasks={assessment?.tasks}
          totalCheckPoints={assessment?.tasks.length}
          currentCheckPoint={currentCheckPoint}
          handlePointClick={handlePointClick}
        />
      )}

      <Grid container sx={{ height: '83vh', flexWrap: 'nowrap' }} padding={3} className={classnames.animater_wrapper}>
        <Grid item spacing={2} padding={'0 2rem'} xs={fullScreen ? 12 : 9} style={GridTransition}>
          <ContainerVideo
            currentTask={currentTask}
            handleUserMediaError={handleUserMediaError}
            handleUserMediaCreated={handleUserMediaCreated}
            handleFullScreen={handleFullScreen}
            handleTaskUpload={handleTaskUpload}
          />
        </Grid>

        {!loading && !fullScreen && (
          <Grid item xs={3} style={GridTransition}>
            <ContainerQuestion assessment={assessment} currentTask={currentTask} />
          </Grid>
        )}
      </Grid>

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
