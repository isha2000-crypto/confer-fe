import { gql } from '@apollo/client'

export const LOAD_ASSESSMENT = gql`
  query Assessments {
    assessments {
      authorId
      description
      _id
      title
      type
      tasks {
        description
        duration
        _id
      }
    }
  }
`
export const VALIDATE_USERS = gql`
  query validateToken {
    validateToken {
      _id
      name
      email
      role
      email_verified
      picture
      permissions
    }
  }
`
export const SUBMITTED_ASSESSMENTS_USER = gql`
  query SubmittedAssessmentsUser($submittedAssessmentsUserId: ObjectID!) {
    submittedAssessmentsUser(id: $submittedAssessmentsUserId) {
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
export const SUBMITTED_ASSESSMENT_BY_ID = gql`
  query SubmittedAssessment($submittedAssessmentId: ObjectID!) {
    submittedAssessment(id: $submittedAssessmentId) {
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
