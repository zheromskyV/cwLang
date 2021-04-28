export default `
type WordType {
  _id: String!
  target: String!
  initial: String!
  targetLang: String!
  initialLang: String!
}

input WordInput {
  _id: String,
  target: String!
  initial: String!
  targetLang: String!
  initialLang: String!
}

extend type Query {
  getWords(targetLang: String!): [WordType!]!
}

extend type Mutation {
  createWord(word: WordInput!): WordType!
}
`;
