import { gql } from '@apollo/client'

export const SUBMITTED_ASSESSMENT_BY_ID = gql`
  query SubmittedAssessment($submittedAssessmentId: ObjectId!) {
    submittedAssessment(id: $submittedAssessmentId) {
      _id
      userId
      status
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
export const SUBMITTED_ASSESSMENTS_USER = gql`
  query SubmittedAssessmentsUser($submittedAssessmentsUserId: ObjectId!) {
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

export const FETCH_SUBMITTED_ASSESSMENTS = gql`
  query SubmittedAssessmentsUser {
    fetchSubmittedAssessments {
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
      status
      taskResponses {
        _id
        taskId
        videoUrl
      }
    }
  }
`
export const LIST_SUBMITTED_ASSESSMENTS = gql`
  query SubmittedAssessments {
    submittedAssessments {
      _id
      tenantId
      status
      tenant {
        name
      }
      userId
      user {
        name
        _id
        email
        picture
      }
      createdAt
      assessment {
        title
      }
    }
  }
`
export const FETCH_ASSESSMENT_BY_USER_ID = gql`
  query SubmittedAssessmentsUser($submittedAssessmentsUserId: ObjectId!) {
    submittedAssessmentsUser(id: $submittedAssessmentsUserId) {
      assessment {
        title
      }
    }
  }
`
