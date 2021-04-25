export default `
extend type Mutation {
  login(email: String!, password: String!): UserType!
}
`;
