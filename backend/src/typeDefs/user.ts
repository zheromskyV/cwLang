export default `
scalar Date

type LanguageType {
  _id: String
  name: String!
  value: Int!
}

type ProfileType {
  _id: String
  nativeLanguage: String!
  debt: Float
  info: String
  discount: Float
  rating: Float
  languages: [LanguageType!]!
}

type UserType {
  _id: String!
  email: String!
  password: String!
  role: String!
  name: String!
  surname: String!
  birthday: Int!
  profile: ProfileType!
}

input LanguageInput {
  name: String!
  value: Int!
}

input ProfileInput {
  nativeLanguage: String!
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
  birthday: Int!
  profile: ProfileInput!
}


extend type Mutation {
  createUser(user: UserInput!): UserType!
  updateUser(id: String!, user: UserInput!): UserType!
}
`;
