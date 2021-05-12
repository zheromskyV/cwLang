import { Marks } from 'src/app/models/marks';

export interface MarksState {
  marks: Marks;
}

export const initialMarksState: MarksState = {
  marks: [],
};
