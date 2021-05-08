import { createAction, props } from '@ngrx/store';

import { Languages } from 'src/app/constants/languages.enum';
import { Word, Words } from 'src/app/models/word';

export const getWords = createAction('[WORDS] GET_WORDS', props<{ initialLang: Languages; targetLang: Languages }>());

export const setWords = createAction('[WORDS] SET_WORDS', props<{ words: Words }>());

export const addWord = createAction('[WORDS] ADD_WORD', props<{ word: Word }>());

export const clearWords = createAction('[WORDS] CLEAR_WORDS');
