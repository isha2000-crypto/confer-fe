import { gql } from "@apollo/client";

export const LOAD_ROLES = gql`
  query Roles {
    roles {
      _id
      title
      tenantId
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
