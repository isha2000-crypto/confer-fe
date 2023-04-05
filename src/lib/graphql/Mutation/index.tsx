import { gql } from '@apollo/client'

export const SIGNUP_USER_MUTATION = gql`
  mutation signupUser($name: String!, $email: String!, $password: String!) {
    signupUser(signupUserInput: { name: $name, email: $email, password: $password }) {
      name
      email
    }
  }
`

export const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(loginUserInput: { email: $email, password: $password }) {
      access_token
      user {
        _id
        name
        email
        role
        email_verified
        picture
        permissions
      }
    }
  }
`
export const LOGIN_GOOGLE_MUTATION = gql`
  mutation LoginGoogle($authuser: String!, $code: String!, $hd: String!, $prompt: String!, $scope: String!) {
    loginGoogle(googleLoginInput: { authuser: $authuser, code: $code, hd: $hd, prompt: $prompt, scope: $scope }) {
      access_token
      user {
        _id
        name
        email
        role
        email_verified
        picture
        permissions
      }
    }
  }
`
export const CREATE_ASSESSMENT_SUBMISSION = gql`
  mutation CreateSubmittedAssessment($createSubmittedAssessmentInput: CreateSubmittedAssessmentInput!) {
    createSubmittedAssessment(createSubmittedAssessmentInput: $createSubmittedAssessmentInput) {
      _id
      userId
      user {
        name
      }
      assessmentId
      assessment {
        title
        description
        type
        author {
          name
        }
        tasks {
          _id
          type
          description
          duration
        }
      }
      createdAt
      updatedAt
      taskResponses {
        _id
        taskId
        videoUrl
      }
    }
  }
`

export const INVITE_USER_MUTATION = gql`
  mutation ($usersInvitationInput: UsersInvitationInput!) {
    inviteUsers(usersInvitationInput: $usersInvitationInput) {
      failed
      sent
    }
  }
`
