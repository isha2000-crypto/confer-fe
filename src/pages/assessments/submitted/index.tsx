import { ASSESSMENTS } from '@custom-types/constants'
import ListSubmittedAssessments from '@components/organisms/SubmittedAssessments/ListSubmittedAssessments'

const SubmittedAssessments = () => {
  return <ListSubmittedAssessments />
}
SubmittedAssessments.acl = {
  action: 'read',
  subject: ASSESSMENTS
}
export default SubmittedAssessments
