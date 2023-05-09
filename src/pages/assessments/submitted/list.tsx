import ListSubmittedAssessments from '@components/organisms/SubmittedAssessments/ListSubmittedAssessments'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'
import { Grid, Typography } from '@mui/material'
import PageHeader from 'src/@core/components/page-header'

const SubmittedAssessments = () => {
  return (
    <Grid container spacing={8} flexDirection={'column'}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>All Users Submissions</Typography>}
          subtitle={<Typography variant='body2'>All assessments attempted by the users</Typography>}
        />
      </Grid>
      <Grid item xs={12}>
        <ListSubmittedAssessments />
      </Grid>
    </Grid>
  )
}
SubmittedAssessments.acl = {
  action: ACTIONS.READ,
  subject: SUBJECTS.ASSESSMENT_SUBMISSION_MANAGEMENT
}
export default SubmittedAssessments
