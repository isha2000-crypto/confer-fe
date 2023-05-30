import { gql } from '@apollo/client'

export const CREATE_TENANT_MUTATION = gql`
  mutation CreateTenant($createTenantInput: CreateTenantInput!) {
    createTenant(createTenantInput: $createTenantInput) {
      _id
      createdAt
    }
  }
`
export const UPDATE_TENANT_STATUS = gql`
  mutation UpdateTenantStatus($updateTenantStatusId: ObjectId!, $updateTenantStatusInput: UpdateTenantStatusInput!) {
    updateTenantStatus(id: $updateTenantStatusId, UpdateTenantStatusInput: $updateTenantStatusInput) {
      _id
      disabled
      name
    }
  }
`
export const UPDATE_TENANT = gql`
  mutation UpdateTenant($updateTenantId: ObjectId!, $UpdateTenantInput: UpdateTenantInput!) {
    updateTenant(id: $updateTenantId, updateTenantInput: $UpdateTenantInput) {
      _id
      assessment_duration
      createdAt
      disabled
      name
      domains
      updatedAt
    }
  }
`
