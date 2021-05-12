import { Course, Group, Profile, User } from '../models';
import { ICourse } from '../types';
import { deleteGroup } from './group';

export const getUserCourses = async (_: void, { id }: { id: String }): Promise<ICourse[]> => {
  try {
    const user = await User.findById(id);

    const profile = await Profile.findById(user?.profile).populate({
      path: 'groups',
      populate: {
        path: 'course',
        populate: {
          path: 'words',
        },
      },
    });

    if (profile?.groups) {
      return profile.groups.map((group) => group.course as ICourse);
    }

    return [];
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const resolvers = {
  Mutation: {
    createCourse: async (_: void, { course }: { course: ICourse }): Promise<ICourse | null> => {
      try {
        const createdCourse = await (await Course.create(course)).populate('words').execPopulate();

        return createdCourse;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    updateCourse: async (_: void, { id, course }: { id: string; course: ICourse }): Promise<ICourse | undefined> => {
      try {
        const updatedCourse = (await Course.findByIdAndUpdate(id, course, { new: true, useFindAndModify: false }))
          ?.populate('words')
          .execPopulate();

        return updatedCourse;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    deleteCourse: async (_: void, { id }: { id: string }): Promise<void> => {
      try {
        const course = await Course.findByIdAndDelete(id);

        const groups = await Group.find().populate({
          path: 'course',
          match: { _id: course!._id },
        });

        groups.forEach(async (group) => {
          await deleteGroup(undefined, { id: String(group._id) });
        });
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  },
  Query: {
    getCourses: async (): Promise<ICourse[]> => {
      try {
        return Course.find().populate('words');
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    getUserCourses,
  },
};

export default resolvers;
