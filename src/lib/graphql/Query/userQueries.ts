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
        tenantId
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
        tenantId
        permissions {
          assessment_submission
          assessment_submission_management
          assessments
          roles
          user_invitation
          users
          admin_settings
          assessment_management
        }
      }
      email_verified
      picture
    }
  }
`
export const FETCH_USER_BY_ID = gql`
  query User($userId: ObjectId!) {
    user(id: $userId) {
      _id
      email
      name
      picture
      role {
        title
        permissions {
          roles
        }
      }
      assessments {
        title
      }
    }
  }
`
