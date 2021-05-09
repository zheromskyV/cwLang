export default `
extend type Mutation {
  sendDebtNotification(userId: String!): Void
  sendQuestionToAdmin(userId: String!, message: String!): Void
}
`;
