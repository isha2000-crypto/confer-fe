// // ** Type import
// import { ASSESSMENTS, ASSESSMENT_URL, ADMIN_URL, INVITE } from '@custom-types/constants'
// import { VerticalNavItemsType } from 'src/@core/layouts/types'

// const navigation = (): VerticalNavItemsType => {
//   return [
//     {
//       title: 'Home',
//       path: '/home',
//       action: 'read',
//       icon: 'mdi:home-outline',
//       subject: 'home'
//     },
//     {
//       title: 'Assessments',
//       icon: 'mdi:calendar-check-outline',
//       action: 'read',
//       subject: ASSESSMENTS,
//       children: [
//         {
//           title: 'Available',
//           path: `${ASSESSMENT_URL}/available`
//         },
//         {
//           title: 'Submitted',
//           path: `${ASSESSMENT_URL}/submitted`
//         }
//       ]
//     },

//     {
//       title: 'Admin',
//       icon: 'mdi-account-settings-variant',
//       action: 'create',
//       subject: INVITE,
//       children: [
//         {
//           title: 'Invite',
//           path: `${ADMIN_URL}/invite`
//         }
//       ]
//     }
//   ]
// }
// export default navigation

import { ASSESSMENTS, ASSESSMENT_URL, ADMIN_URL, INVITE } from '@custom-types/constants'

import { VerticalNavItemsType } from 'src/@core/layouts/types'

import { Roles } from '../../custom-types/enum'

const navigation = (role: any): VerticalNavItemsType => {
  console.log('small role ', role)
  console.log('Big role', role)
  const navItems = [
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
    },
    {
      title: 'Admin',
      icon: 'mdi-account-settings-variant',
      action: 'create',
      subject: INVITE,
      children: [
        {
          title: 'Invite',
          path: `${ADMIN_URL}/invite`
        }
      ]
    }
  ]

  return navItems
}
export default navigation
