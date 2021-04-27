import { gql } from 'apollo-angular';

export const LIST_WORDS = gql`
  query Word($targetLang: String!, $initialLang: String!) {
    listWords(targetLang: $targetLang, initialLang: $initialLang) {
      _id,
      target,
      initial,
      targetLang,
      initialLang,
    }
  }
`;

export const CREATE_WORD = gql`
  mutation Word($word: WordInput) {
    createWord(word: $word) {
      _id,
      target,
      initial,
      targetLang,
      initialLang,
    }
  }
`;

