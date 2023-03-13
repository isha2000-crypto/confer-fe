import { gql } from '@apollo/client'

export const LOAD_USERS = gql`
  query Users {
    users {
      _id
      email
      name
      role
      permissions
    }
  }
`
export const VALIDATE_USERS = gql`
  query validateToken {
    validateToken {
      _id
      email
      name
      role
      permissions
    }
  }
`
