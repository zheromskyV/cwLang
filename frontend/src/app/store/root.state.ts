import { StoreFeature } from './store.enum';
import { AuthState } from './auth/auth.state';
import { UiState } from './ui/ui.state';
import { WordsState } from './words/words.state';
import { StudentsState } from './students/students.state';
import { CoursesState } from './courses/courses.state';
import { TeachersState } from './teachers/teachers.state';

export interface RootState {
  [StoreFeature.Ui]: UiState;
  [StoreFeature.Auth]: AuthState;
  [StoreFeature.Words]: WordsState;
  [StoreFeature.Courses]: CoursesState;
  [StoreFeature.Students]: StudentsState;
  [StoreFeature.Teachers]: TeachersState;
}
