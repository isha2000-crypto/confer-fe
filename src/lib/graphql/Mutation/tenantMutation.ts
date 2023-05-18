import { gql } from '@apollo/client'

export const CREATE_TENANT_MUTATION = gql`
  mutation CreateTenant($createTenantInput: CreateTenantInput!) {
    createTenant(createTenantInput: $createTenantInput) {
      _id
      createdAt
    }
  }
`
