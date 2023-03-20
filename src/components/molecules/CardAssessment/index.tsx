import CardBasic from '@components/atoms/CardBasic'
import Heading from '@components/atoms/Heading'
import { HeadingVariant } from '@custom-types/UITypes'
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'
import IconBoxAssessment from './IconBoxAssessment'
import IconTypography from '@components/atoms/IconTypography'
import { useRouter } from 'next/router'
import Button from '@mui/material/Button'
import DiaologRecorder from '../Dialog/DiaologRecorder'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'

const avatarIcons: any = {
  leadership: 'mdi:lead-pencil',
  coding: 'mdi:xml'
}

interface Props {
  _id: string
  type: string
  title: string
  time: any
  responses: string
  tasks: []
  display: Function
  handlePopup: any

  //onClick?: () => void

  // author: string[]
}

function CardAssessment({ _id, type, title, time, responses, tasks, display, handlePopup }: Props) {
  const [open, setOpen] = useState(false)
  console.log('icon time', time)

  // const assessment = useSelector+=>
  //   state.assessments.assessments.find(assess => assess._id === assessmentId)
  // )

  // const OnclickCard = () => {
  //   console.log('hello')

  //   router.push('/recorder')
  // }
  // console.log('Total total1:', display())
  // console.log('we are from', tasks)

  console.log(' iam cardid ', _id)

  return (
    <CardBasic sxContent={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <CustomAvatar skin='light' sx={{ width: 100, height: 100, mb: 2 }}>
        <Icon icon={avatarIcons[type]} fontSize='4rem' />
      </CustomAvatar>
      <Heading variant={HeadingVariant.h6}>{title}</Heading>
      <IconBoxAssessment time={time} responses={responses} tasks={tasks} />
      {/* <IconTypography icon='mdi:account-outline' text={author} tooltip='Author' /> */}
      <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }} onClick={() => handlePopup(_id)}>
        Record
      </Button>
    </CardBasic>
  )
}

export default CardAssessment
