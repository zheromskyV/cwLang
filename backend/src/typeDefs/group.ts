export default `
type GroupType {
  _id: String!
  students: [UserType!]!
  teacher: UserType!
  course: CourseType!
  schedule: ScheduleType!
}

input GroupInput {
  students: [UserInput!]
  teacher: String!
  course: String!
  schedule: ScheduleInput!
}

extend type Query {
  getGroups: [GroupType!]!
  getUserGroups(id: String!): [GroupType!]!
}

extend type Mutation {
  createGroup(group: GroupInput!): GroupType!
  updateGroup(id: String!, group: GroupInput!): GroupType!
  deleteGroup(id: String!): Void
}
`
