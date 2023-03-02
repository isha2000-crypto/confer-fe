// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardAssessment from 'src/components/molecules/CardAssessment'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'


function ListAssessments() {
  const { assessments } = useSelector((state: RootState) => state.assessments)

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
