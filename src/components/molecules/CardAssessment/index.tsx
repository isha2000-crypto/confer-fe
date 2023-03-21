import CardBasic from '@components/atoms/CardBasic'
import Heading from '@components/atoms/Heading'
import { HeadingVariant } from '@custom-types/UITypes'
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'
import IconBoxAssessment from './IconBoxAssessment'
import IconTypography from '@components/atoms/IconTypography'
import Button from '@mui/material/Button'

const avatarIcons: any = {
  LEADERSHIP: 'mdi:lead-pencil',
  CODING: 'mdi:xml'
}

interface Props {
  _id: string
  type: string
  title: string
  time: any
  responses: string
  tasks: string | number
  handlePopup: any
  author: string
}

function CardAssessment({ _id, type, title, time, responses, tasks, author, handlePopup }: Props) {
  return (
    <CardBasic sxContent={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <CustomAvatar skin='light' sx={{ width: 100, height: 100, mb: 2 }}>
        <Icon icon={avatarIcons[type]} fontSize='4rem' />
      </CustomAvatar>
      <Heading variant={HeadingVariant.h6}>{title}</Heading>
      <IconBoxAssessment time={time} responses={responses} tasks={tasks} />
      <IconTypography icon='mdi:account-outline' text={author} tooltip='Author' />
      <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }} onClick={() => handlePopup(_id)}>
        Record
      </Button>
    </CardBasic>
  )
}

export default CardAssessment
