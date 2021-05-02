export default `
  scalar Void

  type CourseType {
    _id: String!
    title: String!
    language: String!
    info: String!
    level: String!
    words: [WordType!]!
    price: Float
  }

  input CourseInput {
    title: String!
    language: String!
    level: String!
    info: String!
    words: [WordInput!]!
    price: Float!
  }

  extend type Query {
    getCourses: [CourseType!]!
  }

  extend type Mutation {
    createCourse(course: CourseInput!): CourseType!
    updateCourse(id: String!, course: CourseInput!): CourseType!
    deleteCourse(id: String!): Void
  }
`
