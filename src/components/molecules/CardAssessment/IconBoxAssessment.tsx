import React from 'react'
import IconTypography from '@components/atoms/IconTypography'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Box, { BoxProps } from '@mui/material/Box'
import { IconText } from '@custom-types/UITypes'

// Styled Box component
interface ExtendedBoxProps extends BoxProps {
  last: boolean
}
const StyledBox = styled(Box, { shouldForwardProp: props => props !== 'last' })<ExtendedBoxProps>(
  ({ last, theme }) => ({
    [theme.breakpoints.up('sm')]: {
      borderRight: !last ? `1px solid ${theme.palette.divider}` : ''
    }
  })
)

interface Props {
  time: string
  responses: string
  tasks: []
}

function IconBoxAssessment({ time, responses, tasks }: Props) {
  const icons: IconText[] = [
    {
      icon: 'mdi:clock-outline',
      text: time,
      tooltip: 'Time'
    },
    {
      icon: 'mdi:file-document-outline',
      text: responses,
      tooltip: 'Responses'
    },
    {
      icon: 'mdi:chat-question-outline',

      text: tasks[1]?.duration,

      tooltip: 'Tasks'
    }
  ]

  // console.log('I am from the IconComponent', tasks[1]?.duration)

  return (
    <Grid container spacing={4}>
      {icons.map((item, index) => {
        return (
          <Grid key={index} item xs={4} sm={4}>
            <StyledBox last={index === icons.length - 1}>
              <IconTypography icon={item.icon} text={item.text} tooltip={item.tooltip} />
            </StyledBox>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default IconBoxAssessment
