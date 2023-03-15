import { gql } from '@apollo/client'

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
