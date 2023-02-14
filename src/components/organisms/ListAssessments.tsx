// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardAssessment from 'src/components/molecules/CardAssessment'

import { useSelector } from 'react-redux'

function ListAssessments() {
  const { assessments }: any = useSelector<any>(state => state.assessments)

  return (
    <>
      {assessments.map((item: any, index: number) => {
        return (
          <Grid key={index} item xs={12} md={6} lg={4}>
            <CardAssessment {...item} />
          </Grid>
        )
      })}
    </>
  )
}

export default ListAssessments
