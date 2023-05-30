// ** MUI Imports
import Accordion from '@mui/material/Accordion'
import Typography from '@mui/material/Typography'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import VideoPlayer from '../VideoPlayer'

const AccordionTasks = ({ tasks, responses }: any) => {
  return (
    <>
      {tasks.map((task: any, index: number) => {
        return (
          <Accordion key={task._id}>
            <AccordionSummary
              id={`submitted-task-header-${task._id}`}
              aria-controls={`submitted-task-content-${task._id}`}
              expandIcon={<Icon icon='mdi:chevron-down' />}
            >
              <Typography variant='body1' sx={{ fontWeight: 'bold' }}>{`${index + 1}. ${task.description}`}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ textAlign: 'center' }}>
              <VideoPlayer source={responses[index].videoUrl} id={task._id} />
            </AccordionDetails>
          </Accordion>
        )
      })}
    </>
  )
}

export default AccordionTasks
