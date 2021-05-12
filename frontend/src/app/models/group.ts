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

export interface TableGroup {
  _id?: string;
  title: string;
  schedule: string;
  teacher: string;
  students: Users;
}

export type Groups = Group[];

export type TableGroups = TableGroup[];

export type GroupInfo = Group | null | undefined;
