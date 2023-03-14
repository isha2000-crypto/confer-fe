import { gql } from '@apollo/client'

export const VALIDATE_USERS = gql`
  query validateToken {
    validateToken {
      name
      email
      role
      email_verified
      picture
      permissions
    }
  }
`
