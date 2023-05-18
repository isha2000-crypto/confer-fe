import { gql } from '@apollo/client'

export const LOAD_TENANTS = gql`
  query Query {
    tenants {
      _id
      createdAt
      domains
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
