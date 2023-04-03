// ** Type import
import { ASSESSMENTS, ASSESSMENT_URL } from '@custom-types/constants'
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      action: 'read',
      icon: 'mdi:home-outline',
      subject: 'home'
    },
    {
      title: 'Assessments',
      icon: 'mdi:calendar-check-outline',
      action: 'read',
      subject: ASSESSMENTS,
      children: [
        {
          title: 'Available',
          path: `${ASSESSMENT_URL}/available`
        },
        {
          title: 'Submitted',
          path: `${ASSESSMENT_URL}/submitted`
        },
        {
          title: 'Create Assessment',
          path: `${ASSESSMENT_URL}/create`
        }
      ]
    }
  ]
}
export default navigation
