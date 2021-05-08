import { Words } from 'src/app/models/word';

export interface WordsState {
  words: Words;
}

export const initialWordsState: WordsState = {
  words: [],
};
