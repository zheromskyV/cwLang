import { gql } from 'apollo-angular';

export const SEND_DEBT_NOTIFICATION = gql`
  mutation Notification($userId: String!) {
    sendDebtNotification(userId: $userId)
  }
`;

export const SEND_QUESTION_TO_ADMIN = gql`
  mutation Notification($userId: String!, $message: String!) {
    sendQuestionToAdmin(userId: $userId, message: $message)
  }
`;
