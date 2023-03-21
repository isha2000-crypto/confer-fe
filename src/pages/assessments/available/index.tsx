// ** MUI Imports
import Grid from '@mui/material/Grid'
import ListAssessments from 'src/components/organisms/ListAssessments'
import { ASSESSMENTS } from '@custom-types/constants'

const Assessments = () => {
  return (
    <Grid container spacing={6}>
      <ListAssessments />
    </Grid>
  )
}
Assessments.acl = {
  action: 'read',
  subject: ASSESSMENTS
}
export default Assessments
