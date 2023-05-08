import { URLS } from '@custom-types/constants'

import { VerticalNavItemsType } from 'src/@core/layouts/types'

import { ACTIONS, SUBJECTS } from '../../custom-types/enum'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const navigation = (): VerticalNavItemsType => {
  const navItems = [
    {
      title: 'Home',
      path: `${URLS.HOME}`,
      icon: 'mdi:home-outline',
      action: ACTIONS.READ,
      subject: SUBJECTS.PUBLIC
    },
    {
      title: 'Assessments',
      icon: 'mdi:calendar-check-outline',
      children: [
        {
          action: ACTIONS.READ,
          subject: SUBJECTS.ASSESSMENT,
          title: 'Available',
          path: `${URLS.ASSESSMENT_URL}/available`
        },
        {
          action: ACTIONS.READ,
          subject: SUBJECTS.ASSESSMENT_SUBMISSION,
          title: 'Submitted',
          path: `${URLS.ASSESSMENT_URL}/submitted`
        },
        {
          action: ACTIONS.CREATE,
          subject: SUBJECTS.ASSESSMENT,
          title: 'Create',
          path: `${URLS.ASSESSMENT_URL}/create`
        }
      ]
    },
    {
      title: 'Admin',
      icon: 'mdi-account-settings-variant',
      children: [
        {
          subject: SUBJECTS.USER_INVITATION,
          action: ACTIONS.CREATE,
          title: 'Invite',
          path: `${URLS.ADMIN}/invite`
        },
        {
          subject: SUBJECTS.ROLES,
          action: ACTIONS.READ,
          title: 'Roles',
          path: `${URLS.ADMIN}/roles`
        },
        {
          subject: SUBJECTS.TENANTS,
          action: ACTIONS.READ,
          title: 'Tenants',
          path: `${URLS.ADMIN}/tenants`
        }
      ]
    }
  ]

  return navItems
}
export default navigation
