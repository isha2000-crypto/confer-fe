import { gql } from '@apollo/client'

export const LOAD_USERS = gql`
  query Users {
    users {
      email
      id
      name
      role
    }
  }
`
