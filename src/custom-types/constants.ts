import { SUBJECTS } from './enum'

export const ASSESSMENTS = 'assessments'
export const ASSESSMENT_URL = '/assessments'
export const ACCESS_TOKEN = 'access_token'
export const ADMIN_URL = '/admin'
export const INVITE = 'invite'
export const URLS = {
  ASSESSMENT_URL: '/assessments',
  ADMIN: '/admin',
  HOME: '/home',
  PROFILE: '/profile'
}

export const SUBJECT_TITLES: any = {
  [SUBJECTS.ASSESSMENT]: 'Assessments',
  [SUBJECTS.ASSESSMENT_SUBMISSION]: 'Submission of Assessments',
  [SUBJECTS.ROLES]: 'Manage Roles',
  [SUBJECTS.TENANTS]: 'Manage Tenants',
  [SUBJECTS.USERS]: 'Manage Users',
  [SUBJECTS.USER_INVITATION]: 'Users Invitation'
}
