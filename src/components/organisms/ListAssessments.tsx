// // ** MUI Imports
import Grid from '@mui/material/Grid'
import CardAssessment from 'src/components/molecules/CardAssessment'

// //import { RootState } from 'src/store'
import React, { useEffect, useState } from 'react'

// import { useSelector, useDispatch } from 'react-redux'
// import { fetchAssessments, AssessmentsState } from '../../store/assessments/ assessmentsSlice'

// //import ApiService from '../../lib/api/ApiService'
// import { toast } from 'react-hot-toast'

// function ListAssessments() {
//   // const { assessments } = useSelector((state: RootState) => state.assessments)
//   // const [assessments, setassessments] = useState([])
//   // const { FetchAssessments } = ApiService()
//   // const { error, loading, data } = FetchAssessments()
//   const dispatch = useDispatch()
//   const { assessments, status, error } = useSelector((state: { assessments: AssessmentsState }) => state.assessments)

//   // useEffect(() => {
//   //   if (data) {
//   //     console.log('Assessments data:', data)

//   //     setassessments(data.assessments)
//   //   }
//   //   if (error) {
//   //     toast.error(error.message)
//   //   }
//   // }, [data, error])

//   useEffect(() => {
//     dispatch(fetchAssessments)
//   }, [dispatch])

//   if (status === 'loading') {
//     return <div>Loading...</div>
//   }

//   if (status === 'failed') {
//     return <div>{error}</div>
//   }
//   console.log('Assessments state:', assessments)

//   return (
//     <>
//       {assessments.map((item: any, index: number) => {
//         return (
//           <Grid key={index} item xs={12} md={6} lg={4}>
//             <CardAssessment {...item} />
//           </Grid>
//         )
//       })}
//     </>
//   )
// }

// export default ListAssessments

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { fetchAssessments } from '../../store/assessments/assessmentsSlice'
import { Assessment } from '@custom-types/assessmentsType'
import { duration } from '@mui/material'
import DiaologRecorder from '@components/molecules/Dialog/DiaologRecorder'
import { useRouter } from 'next/router'

const ListAssessments = () => {
  const router = useRouter()
  const [durationTime, setDurationime] = useState(0)
  const [openPopup, setOpenPopup] = useState<boolean>(false)
  const [popupAssessment, setPopupAssessment] = useState<Assessment>()
  const dispatch = useDispatch()
  const { loading, assessments, error } = useSelector((state: RootState) => state.assessments)

  useEffect(() => {
    dispatch(fetchAssessments()) // dispatch the fetchAssessments action here
  }, [dispatch])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  console.log('ListAssessment', assessments[1]?.tasks[0]?.duration)

  const display = () => {
    const durations = assessments?.reduce((accumulator: number, assessment: Assessment) => {
      return (
        accumulator +
        assessment.tasks.reduce((taskDuration: number, task: any) => {
          // return taskDuration + task.duration
          console.log('this is return', (taskDuration + parseInt(task.duration)) / 60)

          return (taskDuration + parseInt(task.duration)) / 60
        }, 0)
      )
    }, 0)
    console.log('me durations here ', durations)

    setDurationime(durations)
  }

  const handleOpenPopup = assessmentId => {
    setOpenPopup(true)
    setPopupAssessment(assessments.find(assessment => assessment._id === assessmentId))
  }

  // console.log('Total total:', display())
  console.log('this is the setDuration result', durationTime)
  const handleAgree = () => {
    router.push(`/recorder/${popupAssessment?._id}`)
  }

  return (
    <>
      <ul>
        {assessments?.map((assessment: Assessment) => (
          <Grid key={assessment._id} item xs={12} md={6} lg={4}>
            <CardAssessment
              _id={assessment._id}
              type={assessment.type}
              title={assessment.title}
              time={durationTime}
              responses={assessment.responses}
              tasks={assessment.tasks}
              handlePopup={handleOpenPopup}
              display={display}

              // author={assessment.author}
            />
          </Grid>
        ))}
      </ul>
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
    </>
  )
}

// decide on run time which title etc
export default ListAssessments
