import ListSubmittedAssessments from '@components/organisms/SubmittedAssessments/ListSubmittedAssessments'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'

const SubmittedAssessments = () => {
  return <ListSubmittedAssessments />
}
SubmittedAssessments.acl = {
  action: ACTIONS.READ,
  subject: SUBJECTS.ASSESSMENT_SUBMISSION
}
export default SubmittedAssessments
