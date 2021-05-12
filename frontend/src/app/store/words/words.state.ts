import { Words } from 'src/app/models/word';

export interface WordsState {
  words: Words;
  studentWords: Words;
  favoriteWords: Words;
}

export const initialWordsState: WordsState = {
  words: [],
  studentWords: [],
  favoriteWords: [],
};
