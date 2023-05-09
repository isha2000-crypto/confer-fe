import Grid from '@mui/material/Grid'
import CardAssessment from 'src/components/molecules/CardAssessment'
import React, { useContext, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { fetchAssessments } from '../../store/assessments/assessmentsSlice'
import { Assessment } from '@custom-types/assessmentsType'
import DiaologRecorder from '@components/molecules/Dialog/DiaologRecorder'
import { useRouter } from 'next/router'
import Spinner from 'src/@core/components/spinner'
import { Box, Button, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { URLS } from '@custom-types/constants'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'
import { displayTime } from 'src/utils/timeFuncs'

const ListAssessments = () => {
  const ability = useContext(AbilityContext)
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

  const handleOpenPopup = (assessmentId: string) => {
    setOpenPopup(true)
    setPopupAssessment(assessments.find(assessment => assessment._id === assessmentId))
  }

  const handleAgree = () => {
    router.push(`/recorder/${popupAssessment?._id}`)
  }

  const handleEmptyClick = () => {
    router.push(`${URLS.ASSESSMENT_URL}/create`)
  }

  if (assessments.length == 0) {
    return (
      <Box
        sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column', '& svg': { mb: 2 } }}
      >
        <Icon icon='mdi:pencil-outline' fontSize='2rem' />
        <Typography sx={{ mb: 4, fontWeight: 600 }}>No Assessments Available</Typography>
        <Typography sx={{ mb: 3 }}>No assessments are currently available. Check again Later!</Typography>
        {ability?.can(ACTIONS.CREATE, SUBJECTS.ASSESSMENT) && (
          <Button sx={{ mb: 8 }} variant='contained' onClick={handleEmptyClick}>
            Create Assessment
          </Button>
        )}
      </Box>
    )
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
          title='Are You sure You want to record the assessment ?'
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
