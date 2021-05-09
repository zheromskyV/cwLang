export interface Schedule {
  _id: String;
  title: String;
  startTime: String;
  endTime: String;
  startRecur: String;
  endRecur: String;
  daysOfWeek: number[];
}
