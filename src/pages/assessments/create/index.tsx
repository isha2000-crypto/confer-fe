import { ACTIONS, SUBJECTS } from '@custom-types/enum'
import AssessmentForm from '../../../components/organisms/Forms/AssessmentForm'

const FormLayoutsSeparator = () => {
  return <AssessmentForm />
}

FormLayoutsSeparator.acl = {
  action: ACTIONS.CREATE,
  subject: SUBJECTS.ASSESSMENT
}

export default FormLayoutsSeparator
