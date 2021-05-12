import { Users } from 'src/app/models/user';

export interface TeachersState {
  teachers: Users;
}

export const initialTeachersState: TeachersState = {
  teachers: [],
};
