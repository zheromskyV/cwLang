export interface Schedule {
  _id?: string;
  title: string;
  startTime: string;
  endTime: string;
  startRecur: string;
  endRecur: string;
  daysOfWeek: number[];
}

export type ScheduleEvents = Schedule[];
