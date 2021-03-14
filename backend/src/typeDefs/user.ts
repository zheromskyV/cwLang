export default `
scalar Date

type UserType {
  _id: String!
  email: String!
  role: String!
  name: String!
  surname: String!
  birthdate: Date
  nativeLanguage: String
  info: String
  debt: Float
  discount: Float
  rating: Float
}

input UserInput {
  email: String!
  password: String!
  role: String!
  name: String!
  surname: String!
  birthdate: Date
  nativeLanguage: String
  info: String
  debt: Float
  discount: Float
  rating: Float
}

extend type Mutation {
  createUser(user: UserInput!): UserType!
}
`;
