import { gql } from '@apollo/client'

export const LOAD_USERS = gql`
  query Users {
    users {
      _id
      email
      email_verified
      name
      picture
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
      role {
        _id
        title
        permissions {
          assessment_submission
          assessment_submission_management
          assessments
          roles
          tenants
          user_invitation
          users
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
      }
      assessments {
        title
      }
    }
  }
`
