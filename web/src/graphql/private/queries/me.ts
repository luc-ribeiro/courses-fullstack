import { gql } from '@apollo/client'

export const GET_USER_INFO = gql`
  query me {
    me {
    enrollments {
      id
      createdAt

      course {
        title
        slug
      }
    }
  }
  }`