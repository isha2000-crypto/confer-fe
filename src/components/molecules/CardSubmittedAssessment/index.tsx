import CardBasic from '@components/atoms/CardBasic'
import Heading from '@components/atoms/Heading'
import { HeadingVariant } from '@custom-types/UITypes'
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'
import IconBoxAssessment from '../CardAssessment/IconBoxAssessment'
import IconTypography from '@components/atoms/IconTypography'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { displayTime } from 'src/utils/timeFuncs'

const avatarIcons: any = {
  LEADERSHIP: 'mdi:lead-pencil',
  CODING: 'mdi:xml'
}

function CardAssessment(props: any) {
  const time = displayTime(props.assessment)
  const router = useRouter()

  const handleClick = () => {
    router.push(`/assessments/submitted/${props.userId}/${props._id}/view`)
  }

  return (
    <CardBasic sxContent={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <CustomAvatar skin='light' sx={{ width: 100, height: 100, mb: 2 }}>
        <Icon icon={avatarIcons[props.assessment.type]} fontSize='4rem' />
      </CustomAvatar>
      <Heading variant={HeadingVariant.h6}>{props.assessment.title}</Heading>
      <IconBoxAssessment time={time} responses={'1'} tasks={props.assessment.tasks.length} />
      <IconTypography icon='mdi:account-outline' text={props.assessment.author.name} tooltip='Author' />
      <Button variant='contained' onClick={handleClick}>
        View Details
      </Button>
    </CardBasic>
  )
}

export default CardAssessment
