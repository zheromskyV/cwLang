export default `
type ScheduleType {
  _id: String!
  title: String!
  startTime: String!
  endTime: String!
  startRecur: String!
  endRecur: String!
  daysOfWeek: [Int!]!
}

input ScheduleInput {
  title: String!
  startTime: String!
  endTime: String!
  startRecur: String!
  endRecur: String!
  daysOfWeek: [Int!]!
}


extend type Query {
  getUserSchedule(id: String!): [ScheduleType!]!
}
`;
