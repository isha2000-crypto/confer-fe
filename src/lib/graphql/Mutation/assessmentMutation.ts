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
export const UPDATE_ASSESSMENT_MUTATION = gql`
  mutation UpdateAssessment($updateAssessmentId: ObjectId!, $updateAssessmentInput: UpdateAssessmentInput!) {
    updateAssessment(id: $updateAssessmentId, updateAssessmentInput: $updateAssessmentInput) {
      description
      tasks {
        description
        duration
        type
      }
      title
      type
    }
  }
`
