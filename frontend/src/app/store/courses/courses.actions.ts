import { createAction, props } from '@ngrx/store';

import { Course, Courses } from 'src/app/models/course';

export const getCourses = createAction('[COURSES] GET_COURSES');

export const setCourses = createAction('[COURSES] SET_COURSES', props<{ courses: Courses }>());

export const addCourse = createAction('[COURSES] ADD_COURSE', props<{ course: Course }>());

export const updateCourse = createAction('[COURSES] UPDATE_COURSE', props<{ course: Course }>());

export const deleteCourse = createAction('[COURSES] DELETE_COURSE', props<{ course: Course }>());

export const clearCourses = createAction('[COURSES] CLEAR_COURSES');
