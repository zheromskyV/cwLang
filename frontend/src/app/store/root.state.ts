import { StoreFeature } from './store.enum';
import { AuthState } from './auth/auth.state';
import { UiState } from './ui/ui.state';
import { WordsState } from './words/words.state';
import { StudentsState } from './students/students.state';
import { CoursesState } from './courses/courses.state';
import { TeachersState } from './teachers/teachers.state';
import { GroupsState } from './groups/groups.state';

export interface RootState {
  [StoreFeature.Ui]: UiState;
  [StoreFeature.Auth]: AuthState;
  [StoreFeature.Words]: WordsState;
  [StoreFeature.Groups]: GroupsState;
  [StoreFeature.Courses]: CoursesState;
  [StoreFeature.Students]: StudentsState;
  [StoreFeature.Teachers]: TeachersState;
}
