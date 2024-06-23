import { gql } from '@apollo/client'

export const FETCH_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      title
    }
  }`