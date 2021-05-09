import { Course } from './course';
import { Schedule } from './schedule';
import { User, Users } from './user';

export interface Group {
  _id?: string;
  students: Users;
  teacher: User;
  course: Course;
  schedule: Schedule;
}

export type Groups = Group[];

export type GroupInfo = Group | null | undefined;
