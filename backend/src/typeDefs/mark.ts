export default `
type MarkType {
  _id: String!
  value: Float!
  message: String!
}

input MarkInput {
  value: Float!
  message: String!
}

extend type Query {
  getUserMarks(userId: String!): [MarkType]!
}

extend type Mutation {
  addMark(userId: String!, mark: MarkInput!): MarkType!
}
`;
