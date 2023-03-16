// ** Type import
import { ASSESSMENTS, ASSESSMENT_URL } from '@custom-types/constants'
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'mdi:home-outline',
      subject: 'home'
    },
    {
      title: 'Assessments',
      path: ASSESSMENT_URL,
      icon: 'mdi:calendar-check-outline',
      action: 'read',
      subject: ASSESSMENTS
    },
    {
      title: 'Recorder',
      path: '/recorder',
      icon: 'mdi:record'
    }
  ]
}
export default navigation
