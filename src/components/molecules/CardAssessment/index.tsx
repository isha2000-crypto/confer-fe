import CardBasic from '@components/atoms/CardBasic'
import Heading from '@components/atoms/Heading'
import { HeadingVariant } from '@custom-types/UITypes'
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'
import IconBoxAssessment from './IconBoxAssessment'
import IconTypography from '@components/atoms/IconTypography'

const avatarIcons: any = {
  leadership: 'mdi:lead-pencil',
  coding: 'mdi:xml'
}

interface Props {
  type: string
  title: string
  time: string
  responses: string
  tasks: string
  author: string
}

function CardAssessment({ type, title, time, responses, tasks, author }: Props) {
  return (
    <CardBasic sxContent={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <CustomAvatar skin='light' sx={{ width: 100, height: 100, mb: 2 }}>
        <Icon icon={avatarIcons[type]} fontSize='4rem' />
      </CustomAvatar>
      <Heading variant={HeadingVariant.h6}>{title}</Heading>
      <IconBoxAssessment time={time} responses={responses} tasks={tasks} />
      <IconTypography icon='mdi:account-outline' text={author} tooltip='Author' />
    </CardBasic>
  )
}

export default CardAssessment
