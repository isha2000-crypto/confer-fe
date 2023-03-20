import { Grid, Typography } from '@mui/material'
import React from 'react'
import AccordionTasks from '@components/molecules/Accordion/AccordionTasks'

function ViewSubmittedAssessment(props: any) {
  const submittedAssessment = props.data

  return (
    <Grid container rowSpacing={5}>
      <Grid item xs={12}>
        <Typography variant='h5'>{submittedAssessment.assessment.title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='body1'>{submittedAssessment.assessment.description}</Typography>
      </Grid>
      <Grid item xs={12}>
        <AccordionTasks tasks={submittedAssessment.assessment.tasks} responses={submittedAssessment.taskResponses} />
      </Grid>
    </Grid>
  )
}

export default ViewSubmittedAssessment
