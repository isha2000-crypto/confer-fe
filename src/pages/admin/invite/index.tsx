// ** React Imports
// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InviteForm from '../../../components/organisms/Forms/InviteForm'
import { SUBJECTS, ACTIONS } from '@custom-types/enum'

// ** Icon Imports
// Styled component for the form
const FormLayoutsAlignment = () => {
  // Handle Password
  return (
    <Card>
      <CardHeader title='Invitation Form ' />
      <CardContent sx={{ minHeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <InviteForm />
      </CardContent>
    </Card>
  )
}
FormLayoutsAlignment.acl = {
  subject: SUBJECTS.USER_INVITATION,
  action: ACTIONS.CREATE
}
export default FormLayoutsAlignment
