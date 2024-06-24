import { gql } from '@apollo/client';

export const CREATE_PURCHASE = gql`
  mutation CreatePurchase($productId: String!) {
    createPurchase(data: { productId: $productId }) {
      id
    }
  }
`;
