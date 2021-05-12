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
  getWords(targetLang: String!, initialLang: String!): [WordType!]!
  getAllUserWords(id: String!): [WordType!]!
  getFavoriteWords(id: String!): [WordType!]!
}

extend type Mutation {
  createWord(word: WordInput!, courseId: String!): WordType!
  addFavoriteWord(id: String!, wordId: String!): Void
}
`;
