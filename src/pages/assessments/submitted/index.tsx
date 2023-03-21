// ** MUI Imports
import Grid from '@mui/material/Grid'
import { ASSESSMENTS } from '@custom-types/constants'
import ListSubmittedAssessments from '@components/organisms/SubmittedAssessments/ListSubmittedAssessments'

const SubmittedAssessments = () => {
  return (
    <Grid container spacing={6}>
      <ListSubmittedAssessments />
    </Grid>
  )
}
SubmittedAssessments.acl = {
  action: 'read',
  subject: ASSESSMENTS
}
export default SubmittedAssessments
