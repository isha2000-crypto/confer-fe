import ListAssessments from './ListAssessments'
import CardAssessment from '../molecules/CardAssessment'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { fetchAssessments } from '../../store/assessments/assessmentsSlice'
import { Assessment } from '@custom-types/assessmentsType'
import { useEffect } from 'react'

const ParentComponent = () => {
  const { assessments } = useSelector((state: RootState) => state.assessments)
  const dispatch = useDispatch()
  const { loading, assessments, error } = useSelector((state: RootState) => state.assessments)

  useEffect(() => {
    dispatch(fetchAssessments()) // dispatch the fetchAssessments action here
  }, [dispatch])

  const display = () => {
    const durations = assessments?.reduce((accumulator: number, assessment: Assessment) => {
      return (
        accumulator +
        assessment.tasks.reduce((taskDuration: number, task: any) => {
          // return taskDuration + task.duration
          return taskDuration + parseInt(task.duration)
        }, 0)
      )
    }, 0)

    console.log('Total duration:', durations)
    return durations // return the total duration
  }

  return (
    <div>
      <ListAssessments assessments={assessments} />
      <CardAssessment
        type={assessments[0]?.type}
        title={assessments[0]?.title}
        time={assessments[0]?.time}
        responses={assessments[0]?.responses}
        tasks={[...assessments[0]?.tasks]}
        duration={display()} // pass the result of display function as prop
      />
    </div>
  )
}

export default ParentComponent
