import { Assessment } from '@custom-types/assessmentsType'

export const convertToTime = (value: number) => {
  return Math.floor(value / 60) + ':' + ('0' + Math.floor(value % 60)).slice(-2)
}

export const displayTime = (assessment: Assessment) => {
  const duration = assessment.tasks.reduce((accumulator: number, task: any) => accumulator + task.duration, 0)

  return `${Math.ceil(duration / 60)} m`
}
