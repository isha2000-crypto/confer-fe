import { gql } from "@apollo/client";

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
