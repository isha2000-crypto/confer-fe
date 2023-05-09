import ListUserAssessmentSubmissions from '@components/organisms/SubmittedAssessments/ListUserAssessmentSubmissions'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'

const SubmittedAssessments = () => {
  return <ListUserAssessmentSubmissions />
}
SubmittedAssessments.acl = {
  action: ACTIONS.READ,
  subject: SUBJECTS.ASSESSMENT_SUBMISSION
}
export default SubmittedAssessments
