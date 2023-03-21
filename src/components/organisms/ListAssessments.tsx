import Grid from '@mui/material/Grid'
import CardAssessment from 'src/components/molecules/CardAssessment'
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { fetchAssessments } from '../../store/assessments/assessmentsSlice'
import { Assessment } from '@custom-types/assessmentsType'
import DiaologRecorder from '@components/molecules/Dialog/DiaologRecorder'
import { useRouter } from 'next/router'
import Spinner from 'src/@core/components/spinner'

const ListAssessments = () => {
  const router = useRouter()
  const [openPopup, setOpenPopup] = useState<boolean>(false)
  const [popupAssessment, setPopupAssessment] = useState<Assessment>()
  const dispatch = useDispatch<any>()
  const { loading, assessments, error } = useSelector((state: RootState) => state.assessments)

  useEffect(() => {
    dispatch(fetchAssessments()) // dispatch the fetchAssessments action here
  }, [dispatch])

  if (loading) return <Spinner />

  if (error) {
    return <div>Error: {error}</div>
  }

  const displayTime = (assessment: Assessment) => {
    const duration = assessment.tasks.reduce((accumulator: number, task: any) => accumulator + task.duration, 0)

    return `${duration / 60} m`
  }

  const handleOpenPopup = (assessmentId: string) => {
    setOpenPopup(true)
    setPopupAssessment(assessments.find(assessment => assessment._id === assessmentId))
  }

  const handleAgree = () => {
    router.push(`/recorder/${popupAssessment?._id}`)
  }

  return (
    <>
      <Grid container spacing={6}>
        {assessments?.map((assessment: any) => (
          <Grid key={assessment._id} item xs={12} md={6} lg={4}>
            <CardAssessment
              _id={assessment._id}
              type={assessment.type}
              title={assessment.title}
              time={displayTime(assessment)}
              responses={'1'}
              tasks={assessment.tasks.length}
              handlePopup={handleOpenPopup}
              author={assessment.author.name}
            />
          </Grid>
        ))}
      </Grid>
      {popupAssessment && (
        <DiaologRecorder
          id={popupAssessment?._id}
          title='Confirmation'
          text='hello there'
          agreeText='Yes'
          cancelText='No'
          assessment={popupAssessment}
          open={openPopup}
          setOpen={setOpenPopup}
          handleAgree={handleAgree}
        />
      )}
    </>
  )
}

// decide on run time which title etc
export default ListAssessments
