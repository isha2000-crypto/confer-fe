import { gql } from '@apollo/client'

const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(loginUserInput: { email: $email, password: $password }) {
      access_token
      user {
        name
        email
        role
      }
    }
  }
`
export default LOGIN_USER_MUTATION
