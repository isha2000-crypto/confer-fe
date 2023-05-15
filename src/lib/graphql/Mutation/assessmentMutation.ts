import { gql } from '@apollo/client'

export const CREATE_ASSESSMENT_SUBMISSION = gql`
  mutation CreateSubmittedAssessment($createSubmittedAssessmentInput: CreateSubmittedAssessmentInput!) {
    createSubmittedAssessment(createSubmittedAssessmentInput: $createSubmittedAssessmentInput) {
      _id
      userId
      user {
        name
      }
      assessmentId
      assessment {
        title
        description
        type
        author {
          name
        }
        tasks {
          _id
          type
          description
          duration
        }
      }
      createdAt
      updatedAt
      taskResponses {
        _id
        taskId
        videoUrl
      }
    }
  }
`
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
