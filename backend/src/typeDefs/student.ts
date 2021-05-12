export default `
extend type Mutation {
  addStudentToGroup(userId: String!, groupId: String!): UserType!
  removeStudentFromGroup(userId: String!, groupId: String!): UserType!
}
`;
