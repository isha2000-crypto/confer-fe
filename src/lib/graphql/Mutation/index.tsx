import { gql } from "@apollo/client";

const SIGNUP_USER_MUTATION = gql`
  mutation signupUser($name: String!,$email: String!, $password: String!) {
    signupUser(signupUserInput: { name:$name,email: $email, password: $password }) {
        name
        email
      
      
    }
  }
`;
export default SIGNUP_USER_MUTATION;