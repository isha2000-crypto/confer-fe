// ** MUI Imports
import ListAssessments from 'src/components/organisms/ListAssessments'
import { ASSESSMENTS } from '@custom-types/constants'

const Assessments = () => {
  return <ListAssessments />
}
Assessments.acl = {
  action: 'read',
  subject: ASSESSMENTS
}
export default Assessments
