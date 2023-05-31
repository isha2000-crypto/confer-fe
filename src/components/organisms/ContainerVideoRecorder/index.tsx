/* eslint-disable react-hooks/exhaustive-deps */
import { Task } from '@custom-types/assessmentsType'
import { Grid, Theme, useMediaQuery } from '@mui/material'
import React from 'react'
import { useState } from 'react'

// import PermissionDeniedFallback from './PermissionDeniedFallback'
import { useAuth } from 'src/hooks/useAuth'
import DialogSubmissionComplete from '@components/molecules/Dialog/DialogSubmissionComplete'
import { useMutation } from '@apollo/client'
import { UPDATE_ASSESSMENT_SUBMISSION } from 'src/lib/graphql/Mutation'
import { useRouter } from 'next/router'
import classnames from './ContainerVideoRecorder.module.scss'
import { useTheme } from '@mui/material'
import { uploadFile } from 'src/lib/api/FileUpload'
import { UserDataType } from '@custom-types/contextTypes'
import ContainerQuestion from '@components/molecules/ContainerQuestions'
import ContainerVideo from '@components/molecules/ContainerVideo'
import { TaskStatus } from '@custom-types/enum'

// import DialogMediaOnboarding from '@components/molecules/Dialog/DialogMediaOnboarding'

interface props {
  initiatedSubmission: any
}

function ContainerVideoRecorder({ initiatedSubmission }: props) {
  const theme = useTheme()
  const GridTransition = {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  }

  const [updateSubmission] = useMutation(UPDATE_ASSESSMENT_SUBMISSION)
  const [fullScreen, setFullScreen] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [allowed, setAllowed] = React.useState(true)
  const [currentTask, setCurrentTask] = React.useState<Task>(initiatedSubmission?.assessment?.tasks[0])
  const [allSubmitPopup, setAllSubmittedPopup] = useState<boolean>(false)
  const [recordings, setRecordings] = useState<any>({})
  const [allUploaded, setAllUploaded] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const router = useRouter()
  const auth = useAuth()
  const largeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

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

  const incrementCurrentTask = (index: number) => {
    const taskId = initiatedSubmission?.assessment.tasks[index]._id
    if (recordings[taskId].status === TaskStatus.OPEN) {
      setCurrentTask(initiatedSubmission?.assessment.tasks[index])
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
      const taskIndex = initiatedSubmission?.assessment.tasks.findIndex((task: any) => task._id === currentTask._id)
      if (taskIndex >= 0 && initiatedSubmission?.assessment.tasks[taskIndex + 1]) {
        incrementCurrentTask(taskIndex + 1)
      } else {
        openSubmitPopup()
      }
      const url = await uploadFile(blob, auth?.user as UserDataType, initiatedSubmission?.assessment, currentTask._id)
      handleRecording(currentTask._id, TaskStatus.SUBMITTED, url)
      submitTaskResponse(currentTask._id, url)
    } catch (error) {}
  }

  const submitTaskResponse = async (taskId: string, videoUrl: string) => {
    const inputData = {
      taskResponses: [
        {
          taskId: taskId,
          videoUrl: videoUrl
        }
      ]
    }

    const result = await updateSubmission({
      variables: {
        id: initiatedSubmission._id,
        updateAssessmentSubmissionInput: inputData
      }
    })

    if (result.errors) {
      alert('Problem with Internet')
    }
  }

  const submitAssessment = async () => {
    const responseArray = Object.values(recordings)

    const inputData = {
      taskResponses: responseArray.map((res: any) => {
        return {
          taskId: res._id,
          videoUrl: res.videoUrl
        }
      })
    }

    const result = await updateSubmission({
      variables: {
        id: initiatedSubmission._id,
        updateAssessmentSubmissionInput: inputData
      }
    })

    if (result.data) {
      setSubmitted(true)
      router.push(`/assessments/submitted/${auth.user?.id}/${result.data.updateAssessmentSubmission._id}/view`)
    }
  }

  React.useEffect(() => {
    if (!Object.keys(recordings).length) {
      initiatedSubmission?.assessment.tasks.forEach((task: any, taskIndex: number) => {
        const submissionIndex = initiatedSubmission.taskResponses.findIndex((item: any) => item.taskId === task._id)
        if (submissionIndex >= 0) {
          handleRecording(task._id, TaskStatus.SUBMITTED, initiatedSubmission.taskResponses[submissionIndex].videoUrl)
          if (initiatedSubmission?.assessment.tasks[taskIndex + 1]) {
            setCurrentTask(initiatedSubmission?.assessment.tasks[taskIndex + 1])
          } else {
            setAllUploaded(true)
          }
        } else {
          handleRecording(task._id, TaskStatus.OPEN, null)
        }
      })
    }
  }, [initiatedSubmission])

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
    return null
  }

  return (
    <>
      <Grid
        container
        sx={{
          minHeight: theme => `calc(100vh - ${theme.spacing((theme.mixins.toolbar.minHeight as number) / 4)})`,
          height: theme => `calc(100vh - ${theme.spacing((theme.mixins.toolbar.minHeight as number) / 4)})`,
          flexWrap: largeScreen ? 'wrap' : 'wrap-reverse',
          flexDirection: largeScreen ? 'row' : 'row-reverse'
        }}
        padding={largeScreen ? 2 : 1}
        className={classnames.animater_wrapper}
      >
        <Grid
          item
          paddingX={largeScreen ? 2 : 0}
          sx={{ height: largeScreen ? '100%' : fullScreen ? '100%' : '77%' }}
          xs={12}
          md={fullScreen ? 12 : 8}
          lg={fullScreen ? 12 : 9}
          style={GridTransition}
        >
          <ContainerVideo
            currentTask={currentTask}
            handleUserMediaError={handleUserMediaError}
            handleUserMediaCreated={handleUserMediaCreated}
            handleFullScreen={handleFullScreen}
            handleTaskUpload={handleTaskUpload}
          />
        </Grid>

        {!loading && !fullScreen && (
          <Grid item xs={12} md={4} lg={3} style={GridTransition}>
            <ContainerQuestion assessment={initiatedSubmission?.assessment} currentTask={currentTask} />
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
