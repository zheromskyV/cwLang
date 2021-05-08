export default `
scalar Date

type LanguageType {
  _id: String
  name: String!
  value: Int!
}

type ProfileType {
  _id: String
  debt: Float
  info: String
  discount: Float
  rating: Float
  languages: [LanguageType!]
  groups: [GroupType]
}

type UserType {
  _id: String!
  email: String!
  password: String!
  role: String!
  name: String!
  surname: String!
  birthday: Float!
  nativeLanguage: String!
  profile: ProfileType!
}

input LanguageInput {
  name: String!
  value: Int!
}

input ProfileInput {
  debt: Float
  info: String
  discount: Float
  rating: Float
  languages: [LanguageInput!]!
}

input UserInput {
  email: String!
  password: String
  role: String!
  name: String!
  surname: String!
  birthday: Float!
  nativeLanguage: String!
  profile: ProfileInput!
}

extend type Query {
  getUsersByRole(role: String!): [UserType!]!
}

extend type Mutation {
  createUser(user: UserInput!): UserType!
  updateUser(id: String!, user: UserInput!): UserType!
}
`;
