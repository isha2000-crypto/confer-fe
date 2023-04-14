import { gql } from '@apollo/client'

export const LOAD_ASSESSMENT = gql`
  query Assessments {
    assessments {
      author {
        name
      }
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

export const LOAD_AVAILABLE_ASSESSMENTS = gql`
  query AvailableAssessments {
    availableAssessments {
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
`
export const VALIDATE_USERS = gql`
  query validateToken {
    validateToken {
      _id
      name
      email
      roleId
      role {
        _id
        title
        permissions {
          assessment_submission
          assessments
          roles
          tenants
          user_invitation
          users
        }
      }
      email_verified
      picture
    }
  }
`

export const FETCH_ASSESSMENT_BY_ID = gql`
  query Assessment($assessmentId: ObjectId!) {
    assessment(id: $assessmentId) {
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
export const SUBMITTED_ASSESSMENT_BY_ID = gql`
  query SubmittedAssessment($submittedAssessmentId: ObjectId!) {
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

export const LOAD_USERS = gql`
  query Users {
    users {
      _id
      email
      email_verified
      name
      picture
      role {
        title
      }
      roleId
    }
  }
`
export const LOAD_ASSESSMENT_TYPE = gql`
  query Query {
    assessments {
      type
    }
  }
`
