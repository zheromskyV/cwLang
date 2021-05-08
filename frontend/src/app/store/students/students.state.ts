import { Users } from 'src/app/models/user';

export interface StudentsState {
  students: Users;
}

export const initialStudentsState: StudentsState = {
  students: [],
};
