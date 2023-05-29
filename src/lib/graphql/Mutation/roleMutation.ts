import { gql } from '@apollo/client'

export const ADD_NEW_ROLE = gql`
  mutation CreateRole($createRoleInput: CreateRoleInput!) {
    createRole(createRoleInput: $createRoleInput) {
      _id
      createdBy
      creator {
        name
      }
      title
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
  }
`
export const UPDATE_ROLE = gql`
  mutation UpdateRole($updateRoleId: ObjectId!, $updateRoleInput: UpdateRoleInput!) {
    updateRole(id: $updateRoleId, updateRoleInput: $updateRoleInput) {
      _id
      title
      tenantId
      permissions {
        assessments
        assessment_submission
        assessment_submission_management
        users
        user_invitation
        roles
        admin_settings
        assessment_management
        users_management
      }
      createdBy
      creator {
        name
      }
    }
  }
`
