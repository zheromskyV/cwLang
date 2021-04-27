export default `
type WordType {
  _id: String!
  target: String!
  initial: String!
  targetLang: String!
  initialLang: String!
}

input WordInput {
  target: String!
  initial: String!
  targetLang: String!
  initialLang: String!
}

extend type Query {
  listWords(targetLang: String!, initialLang: String!): [WordType!]!
}

extend type Mutation {
  createWord(word: WordInput!): WordType!
}
`;
