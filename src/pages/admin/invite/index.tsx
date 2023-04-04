// ** React Imports
// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InviteForm from '../../../components/organisms/Forms/InviteForm'
import { INVITE } from '../../../custom-types/constants'

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
  action: 'create',
  subject: INVITE
}
export default FormLayoutsAlignment
