import CardBasic from '@components/atoms/CardBasic'
import Heading from '@components/atoms/Heading'
import { HeadingVariant } from '@custom-types/UITypes'
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'
import IconBoxAssessment from './IconBoxAssessment'
import IconTypography from '@components/atoms/IconTypography'
import { useRouter } from 'next/router'

const avatarIcons: any = {
  leadership: 'mdi:lead-pencil',
  coding: 'mdi:xml'
}

interface Props {
  type: string
  title: string
  time: string
  responses: string
  tasks: []
  display: Function

  //onClick?: () => void

  // author: string[]
}

function CardAssessment({ type, title, time, responses, tasks, display }: Props) {
  const router = useRouter()
  const OnclickCard = () => {
    console.log('hello')

    router.push('/recorder')
  }
  console.log('Total total1:', display())
  console.log('we are from', tasks)

  return (
    <div onClick={OnclickCard}>
      <CardBasic sxContent={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <CustomAvatar skin='light' sx={{ width: 100, height: 100, mb: 2 }}>
          <Icon icon={avatarIcons[type]} fontSize='4rem' />
        </CustomAvatar>
        <Heading variant={HeadingVariant.h6}>{title}</Heading>
        <IconBoxAssessment time={'h ello'} responses={responses} tasks={tasks} display={display} />
        {/* <IconTypography icon='mdi:account-outline' text={author} tooltip='Author' /> */}
      </CardBasic>
    </div>
  )
}

export default CardAssessment
