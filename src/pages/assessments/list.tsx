import ListAllAssessments from '@components/organisms/AllAssessments/ListAllAssessments'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'
import { Grid, Typography } from '@mui/material'
import PageHeader from 'src/@core/components/page-header'

const AllAssessments = () => {
  return (
    <Grid container spacing={8} flexDirection={'column'}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>All Assessments</Typography>}
          subtitle={<Typography variant='body2'>All assessments created</Typography>}
        />
      </Grid>
      <Grid item xs={12}>
        <ListAllAssessments />
      </Grid>
    </Grid>
  )
}

export default AllAssessments

AllAssessments.acl = {
  action: ACTIONS.READ,
  subject: SUBJECTS.ASSESSMENT_MANAGEMENT
}
