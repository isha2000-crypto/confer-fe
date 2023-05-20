import { gql } from '@apollo/client'

export const LOAD_USERS = gql`
  query Users {
    users {
      _id
      email
      email_verified
      name
      picture
      tenantId
      role {
        title
      }
      roleId
    }
  }
`
export const VALIDATE_USERS = gql`
  query validateToken {
    validateToken {
      _id
      name
      email
      roleId
      tenantId
      role {
        _id
        title
        permissions {
          assessment_submission
          assessment_submission_management
          assessments
          roles
          user_invitation
          users
          admin_settings
        }
      }
      email_verified
      picture
    }
  }
`
