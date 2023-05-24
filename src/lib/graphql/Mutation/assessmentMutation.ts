import { gql } from '@apollo/client'

export const CREATE_ASSESSMENT_MUTATION = gql`
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
