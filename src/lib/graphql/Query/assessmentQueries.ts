import { gql } from '@apollo/client'

export const LOAD_ASSESSMENT_TYPE = gql`
  query Query {
    assessments {
      type
    }
  }
`

export const FETCH_ALL_ASSESSMENTS = gql`
  query Assessments {
    assessments {
      _id
      title
      description
      type
      createdAt
      author {
        name
        email
        picture
      }
      tasks {
        _id
        type
        description
        duration
      }
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
export const FETCH_CREATED = gql`
  query CreatedAssessments {
    createdAssessments {
      _id
      title
      description
      type
      author {
        name
        email
        picture
      }
      tasks {
        _id
        type
        description
        duration
      }
    }
  }
`
