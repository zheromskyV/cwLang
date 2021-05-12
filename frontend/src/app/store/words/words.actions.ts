import { createAction, props } from '@ngrx/store';

import { Languages } from 'src/app/constants/languages.enum';
import { Course } from 'src/app/models/course';
import { User } from 'src/app/models/user';
import { Word, Words } from 'src/app/models/word';

export const getWords = createAction('[WORDS] GET_WORDS', props<{ initialLang: Languages; targetLang: Languages }>());

export const getStudentWords = createAction('[WORDS] GET_STUDENT_WORDS', props<{ user: User }>());

export const getFavoriteWords = createAction('[WORDS] GET_FAVORITE_WORDS', props<{ user: User }>());

export const setWords = createAction('[WORDS] SET_WORDS', props<{ words: Words }>());

export const setStudentWords = createAction('[WORDS] SET_STUDENT_WORDS', props<{ studentWords: Words }>());

export const setFavoriteWords = createAction('[WORDS] SET_FAVORITE_WORDS', props<{ favoriteWords: Words }>());

export const addWord = createAction('[WORDS] ADD_WORD', props<{ course: Course; word: Word }>());

export const addFavoriteWord = createAction('[WORDS] ADD_FAVORITE_WORD', props<{ word: Word }>());

export const clearWords = createAction('[WORDS] CLEAR_WORDS');

export const clearStudentWords = createAction('[WORDS] CLEAR_STUDENT_WORDS');

export const clearFavoriteWords = createAction('[WORDS] CLEAR_FAVORITE_WORDS');

export const downloadFavoriteWords = createAction('[WORDS] DOWNLOAD_FAVORITE_WORDS');
