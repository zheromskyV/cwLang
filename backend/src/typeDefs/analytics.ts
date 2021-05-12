export default `
  type LanguagesAnalyticsType {
    student: [LanguageType!]!
    teacher: [LanguageType!]!
  }

  type CoursesAnalyticsType {
    initialLang: [LanguageType!]!
    targetLang: [LanguageType!]!
  }

  type StudentMark {
    fullname: String!
    marks: [Float]!
  }

  extend type Query {
    languagesAnalytics: LanguagesAnalyticsType!
    coursesAnalytics: CoursesAnalyticsType!
    studentMarks(id: String!): [Float!]!
    studentMarksForTeacher(groupId: String!): [StudentMark!]!
    generalMarks: [Float!]!
  }
`;
