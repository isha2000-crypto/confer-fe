import { gql } from '@apollo/client'

export const LOAD_ASSESSMENT = gql`
query Assessments {
  assessments {
    authorId
    description
    id
    title
    type
    tasks {
      description
      duration
      id
    }
  }
}
`

