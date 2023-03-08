
import { gql } from "@apollo/client";

export const SIGNUP_USER_MUTATION = gql`
  mutation signupUser($name: String!,$email: String!, $password: String!) {
    signupUser(signupUserInput: { name:$name,email: $email, password: $password }) {
        name
        email
      
      
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
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

