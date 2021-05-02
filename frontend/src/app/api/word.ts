import { gql } from 'apollo-angular';

const WORD = `{
  _id,
  target,
  initial,
  targetLang,
  initialLang,
}`;

export const GET_WORDS = gql`
  query Word($targetLang: String!, $initialLang: String!) {
    getWords(targetLang: $targetLang, initialLang: $initialLang) ${WORD}
  }
`;

export const CREATE_WORD = gql`
  mutation Word($word: WordInput!) {
    createWord(word: $word) ${WORD}
  }
`;
