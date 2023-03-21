// ** MUI Imports
import Accordion from '@mui/material/Accordion'
import Typography from '@mui/material/Typography'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const AccordionTasks = ({ tasks, responses }: any) => {
  return (
    <>
      {tasks.map((task, index) => {
        return (
          <Accordion key={task._id}>
            <AccordionSummary
              id={`submitted-task-header-${task._id}`}
              aria-controls={`submitted-task-content-${task._id}`}
              expandIcon={<Icon icon='mdi:chevron-down' />}
            >
              <Typography>{task.description}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ textAlign: 'center' }}>
              <video width='750' height='500' controls>
                <source src={responses[index].videoUrl} type='video/mp4' />
              </video>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </>
  )
}

export default AccordionTasks
