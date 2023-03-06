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
export const VALIDATE_USERS = gql `
query validateToken  {
  validateToken {
    email
    id
    name
  }
}
`