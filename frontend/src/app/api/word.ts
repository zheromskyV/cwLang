import { gql } from 'apollo-angular';

export const WORD = `{
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

export const GET_FAVORITE_WORDS = gql`
  query Word($id: String!) {
    getFavoriteWords(id: $id) ${WORD}
  }
`;

export const GET_ALL_USER_WORDS = gql`
  query Word($id: String!) {
    getAllUserWords(id: $id) ${WORD}
  }
`;

export const CREATE_WORD = gql`
  mutation Word($word: WordInput!, $courseId: String!) {
    createWord(word: $word, courseId: $courseId) ${WORD}
  }
`;

export const ADD_FAVORITE_WORD = gql`
  mutation Word($id: String!, $wordId: String!) {
    addFavoriteWord(id: $id, wordId: $wordId)
  }
`;
