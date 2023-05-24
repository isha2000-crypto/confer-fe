import { gql } from '@apollo/client'

export const INIT_SUBMITTED_ASSESSMENT = gql`
  mutation initSubmittedAssessment($initSubmittedAssessmentInput: InitSubmittedAssessmentInput!) {
    initSubmittedAssessment(initSubmittedAssessmentInput: $initSubmittedAssessmentInput) {
      _id
      assessmentId
      createdAt
      status
      taskResponses {
        _id
        taskId
        videoUrl
        createdAt
        updatedAt
      }
      tenantId
      userId
      assessment {
        _id
        title
        description
        type
        authorId
        author {
          name
        }
        tasks {
          _id
          type
          description
          duration
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const UPDATE_ASSESSMENT_SUBMISSION = gql`
  mutation UpdateAssessmentSubmission(
    $id: ObjectId!
    $updateAssessmentSubmissionInput: UpdateAssessmentSubmissionInput!
  ) {
    updateAssessmentSubmission(id: $id, updateAssessmentSubmissionInput: $updateAssessmentSubmissionInput) {
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
