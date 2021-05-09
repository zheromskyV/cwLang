export default `
extend type Mutation {
  makePayment(userId: String!, paymentAmount: Float!): Void
  addDiscount(userId: String!, discount: Float!): Void
}
`;
