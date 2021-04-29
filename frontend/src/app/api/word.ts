import { gql } from 'apollo-angular';

export const GET_WORDS = gql`
  query Word($targetLang: String!, $initialLang: String!) {
    getWords(targetLang: $targetLang, initialLang: $initialLang) {
      _id,
      target,
      initial,
      targetLang,
      initialLang,
    }
  }
`;

export const CREATE_WORD = gql`
  mutation Word($word: WordInput!) {
    createWord(word: $word) {
      _id,
      target,
      initial,
      targetLang,
      initialLang,
    }
  }
`;

