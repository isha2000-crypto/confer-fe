import { gql } from '@apollo/client'

export const LOAD_TENANTS = gql`
  query Query {
    tenants {
      _id
      createdAt
      domains
      disabled
      name
      updatedAt
    }
  }
`
export const LOAD_CURRENT_TENANT = gql`
  query Query {
    currentTenant {
      assessment_duration
      _id
    }
  }
`
export const FETCH_TENANT_BY_ID = gql`
  query Tenant($tenantId: ObjectId!) {
    tenant(id: $tenantId) {
      _id
      assessment_duration
      createdAt
      disabled
      domains
      name
    }
  }
`
