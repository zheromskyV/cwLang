import { Course } from '../models';
import { ICourse } from '../types';

const resolvers = {
  Mutation: {
    createCourse: async (_: void, { course }: { course: ICourse }): Promise<ICourse | null> => {
      try {
        const createdCourse = await (await Course.create(course)).populate('words').execPopulate();

        return createdCourse;
      } catch(e) {
        console.error(e);
        throw e;
      }
    },
    updateCourse: async (_: void, { id, course }: { id: string, course: ICourse }): Promise<ICourse | undefined> => {
      try {
        const updatedCourse = (await Course.findByIdAndUpdate(id, course, { new: true, useFindAndModify: false }))?.populate('words').execPopulate();

        return updatedCourse;
      } catch(e) {
        console.error(e);
        throw e;
      }
    },
    deleteCourse: async (_: void, { id }: { id: string }): Promise<void> => {
      try {
        await Course.findByIdAndDelete(id);
      } catch(e) {
        console.error(e);
        throw e;
      }
    },
  },
  Query: {
    getCourses: async (): Promise<ICourse[]> => {
      try {
        return Course.find().populate('words');;
      } catch(e) {
        console.error(e);
        throw e;
      }
    },
  },
};

export default resolvers;
