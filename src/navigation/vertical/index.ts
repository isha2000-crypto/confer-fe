import { URLS } from '@custom-types/constants'

import { VerticalNavItemsType } from 'src/@core/layouts/types'

import { ACTIONS, SUBJECTS } from '../../custom-types/enum'
import { useAuth } from 'src/hooks/useAuth'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Navigation = (): VerticalNavItemsType => {
  const auth = useAuth()
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
          children: [
            {
              action: ACTIONS.READ,
              subject: SUBJECTS.ASSESSMENT_SUBMISSION_MANAGEMENT,
              title: 'List',
              path: `${URLS.ASSESSMENT_URL}/submitted/list`
            },
            {
              action: ACTIONS.READ,
              subject: SUBJECTS.ASSESSMENT_SUBMISSION,
              title: 'My Submissions',
              path: `${URLS.ASSESSMENT_URL}/submitted/${auth.user?.id}`
            }
          ]
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
    },
    {
      title: 'Profile',
      icon: 'mdi:account-circle',
      children: [
        {
          subject: SUBJECTS.PUBLIC,
          action: ACTIONS.READ,
          title: 'My Profile',
          path: `${URLS.PROFILE}/view`
        },
        {
          subject: SUBJECTS.PUBLIC,
          action: ACTIONS.READ,
          title: 'Edit',
          path: `${URLS.PROFILE}/edit`
        }
      ]
    }
  ]

  return navItems
}
export default Navigation
