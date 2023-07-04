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
        tenantId
        role {
          _id
          title
          tenantId
          permissions {
            assessment_submission
            assessment_submission_management
            assessments
            roles
            user_invitation
            users
            assessment_management
            admin_settings
            users_management
          }
        }
        email_verified
        picture
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
        roleId
        tenantId
        role {
          _id
          title
          tenantId
          permissions {
            assessment_submission
            assessment_submission_management
            assessments
            roles
            user_invitation
            users
            admin_settings
            assessment_management
            users_management
          }
        }
        email_verified
        picture
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
export const UPDATE_USER = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!, $updateUserId: ObjectId!) {
    updateUser(updateUserInput: $updateUserInput, id: $updateUserId) {
      _id
      roleId
    }
  }
`
export const UPDATE_ASSESSMENT_DURATION = gql`
  mutation Mutation($updateOrganizationId: ObjectId!, $updateOrganizationInput: UpdateOrganizationInput!) {
    updateOrganization(id: $updateOrganizationId, updateOrganizationInput: $updateOrganizationInput) {
      _id
      assessment_duration
    }
  }
`
export const FORGET_PASSWORD = gql`
  mutation ForgetPassword($email: String!) {
    forgetPassword(email: $email)
  }
`
export const VERIFY_TOKEN = gql`
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token)
  }
`
export const RESET_PASSWORD = gql`
  mutation ResetPassword($newPassword: String!, $token: String!) {
    resetPassword(newPassword: $newPassword, token: $token)
  }
`
