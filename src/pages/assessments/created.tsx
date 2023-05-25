import ListCreatedAssessments from '@components/organisms/CreatedAssessments/ListCreatedAssessments'
import { ACTIONS, SUBJECTS } from '@custom-types/enum'
import { Grid, Typography } from '@mui/material'
import PageHeader from 'src/@core/components/page-header'

const MyCreatedAssessments = () => {
  return (
    <Grid container spacing={8} flexDirection={'column'}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Created Assessments</Typography>}
          subtitle={<Typography variant='body2'>My assessments created</Typography>}
        />
      </Grid>
      <Grid item xs={12}>
        <ListCreatedAssessments />
      </Grid>
    </Grid>
  )
}

export default MyCreatedAssessments

MyCreatedAssessments.acl = {
  action: ACTIONS.CREATE,
  subject: SUBJECTS.ASSESSMENT
}
