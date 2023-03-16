import { gql } from '@apollo/client'

export const LOAD_ASSESSMENT = gql`
  query Assessments {
    assessments {
      authorId
      description
      _id
      title
      type
      tasks {
        description
        duration
        _id
      }
    }
  }
`
export const VALIDATE_USERS = gql`
  query validateToken {
    validateToken {
      _id
      name
      email
      role
      email_verified
      picture
      permissions
    }
  }
`
