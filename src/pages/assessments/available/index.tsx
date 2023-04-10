// ** MUI Imports
import ListAssessments from 'src/components/organisms/ListAssessments'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'

const Assessments = () => {
  return <ListAssessments />
}
Assessments.acl = {
  action: ACTIONS.READ,
  subject: SUBJECTS.ASSESSMENT
}
export default Assessments
