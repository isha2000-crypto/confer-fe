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
  [SUBJECTS.ASSESSMENT_SUBMISSION_MANAGEMENT]: 'Assessment Submission Management',
  [SUBJECTS.ROLES]: 'Manage Roles',
  [SUBJECTS.USERS]: 'User Profile',
  [SUBJECTS.USER_INVITATION]: 'Users Invitation',
  [SUBJECTS.ADMIN_SETTINGS]: 'Admin Settings',
  [SUBJECTS.SYSTEM_ADMIN]: 'System Admin',
  [SUBJECTS.ASSESSMENT_MANAGEMENT]: 'Assessments Management',
  [SUBJECTS.USERS_MANAGEMENT]: 'Users Management'
}
