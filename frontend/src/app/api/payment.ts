import { gql } from 'apollo-angular';

export const MAKE_PAYMENT = gql`
  mutation Payment($userId: String!, $paymentAmount: Float!) {
    makePayment(userId: $userId, paymentAmount: $paymentAmount)
  }
`;

export const ADD_DISCOUNT = gql`
  mutation Payment($userId: String!, $discount: Float!) {
    addDiscount(userId: $userId, discount: $discount)
  }
`;
