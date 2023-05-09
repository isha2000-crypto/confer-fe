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
        tenants
        user_invitation
        users
      }
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
        assessment_submission_management
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
