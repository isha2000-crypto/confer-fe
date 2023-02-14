// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardAssessment from 'src/components/molecules/CardAssessment'

const assessments: any = [
  {
    type: 'leadership',
    title: 'Leading a Team',
    time: '15m',
    responses: '21',
    tasks: '5',
    author: 'Husnain'
  },
  {
    type: 'coding',
    title: 'Mern Application',
    time: '15m',
    responses: '21',
    tasks: '5',
    author: 'Husnain'
  },
  {
    type: 'coding',
    title: 'Node Application',
    time: '15m',
    responses: '21',
    tasks: '5',
    author: 'Husnain'
  },
  {
    type: 'coding',
    title: 'Nextjs Application',
    time: '15m',
    responses: '21',
    tasks: '5',
    author: 'Husnain'
  },
  {
    type: 'coding',
    title: 'Heroku Deployment',
    time: '15m',
    responses: '21',
    tasks: '5',
    author: 'Husnain'
  },
  {
    type: 'leadership',
    title: 'Distributing tasks in team',
    time: '15m',
    responses: '21',
    tasks: '5',
    author: 'Husnain'
  }
]

function ListAssessments() {
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
