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
        role {
          _id
          title
          permissions {
            assessment_submission
            assessments
            roles
            tenants
            user_invitation
            users
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
        role {
          _id
          title
          permissions {
            assessment_submission
            assessments
            roles
            tenants
            user_invitation
            users
          }
        }
        email_verified
        picture
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
export const UPDATE_ROLE = gql`
  mutation UpdateRole($updateRoleId: ObjectId!, $updateRoleInput: UpdateRoleInput!) {
    updateRole(id: $updateRoleId, updateRoleInput: $updateRoleInput) {
      _id
      title
      permissions {
        assessments
        assessment_submission
        users
        user_invitation
        tenants
        roles
      }
      createdBy
      creator {
        name
      }
    }
  }
`
export const CREATE_ASSESSMENT = gql`
  mutation ($createAssessmentInput: CreateAssessmentInput!) {
    createAssessment(createAssessmentInput: $createAssessmentInput) {
      _id
      description
      title
      type
      tasks {
        _id
        description
        duration
        type
      }
    }
  }
`
