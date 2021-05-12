import { flatten } from 'lodash';

import { ILanguage, Roles, StudentMark } from '../types';
import { Course, Group, Language, Mark, Profile, User } from '../models';
import { ROLES } from '../constants';

export const studentMarks = async (_: void, { id }: { id: string }): Promise<number[]> => {
  try {
    const user = await User.findById(id).populate('profile');

    const profile = await Profile.findById(user?.profile._id).populate({
      path: 'marks',
      options: { sort: { date: 1 } },
    });

    const marks = profile?.marks?.map((mark) => mark.value);

    return marks || [];
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const resolvers = {
  Query: {
    generalMarks: async (): Promise<number[]> => {
      try {
        const marks = await Mark.aggregate([
          {
            $group: {
              _id: '$value',
              count: {
                $sum: 1,
              },
            },
          },
        ]);

        const generalMarks = new Array(10).fill(0);
        marks.forEach((mark) => (generalMarks[mark._id - 1] = mark.count));

        return generalMarks;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    studentMarks,
    studentMarksForTeacher: async (_: void, { groupId }: { groupId: string }): Promise<StudentMark[]> => {
      try {
        const group = await Group.findById(groupId).populate('students');

        if (group?.students) {
          const marks = group.students.map(async (student) => ({
            fullname: `${student.name} ${student.surname}`,
            marks: await studentMarks(undefined, { id: String(student._id) }),
          }));

          return await Promise.all(marks);
        }

        return [];
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    coursesAnalytics: async (): Promise<{ initialLang: ILanguage[]; targetLang: ILanguage[] }> => {
      try {
        const initialLang = await Course.aggregate([
          {
            $group: {
              _id: '$initialLang',
              count: {
                $sum: 1,
              },
            },
          },
          {
            $project: {
              name: '$_id',
              value: '$count',
              _id: false,
            },
          },
        ]);

        const targetLang = await Course.aggregate([
          {
            $group: {
              _id: '$targetLang',
              count: {
                $sum: 1,
              },
            },
          },
          {
            $project: {
              name: '$_id',
              value: '$count',
              _id: false,
            },
          },
        ]);

        return { initialLang, targetLang };
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    languagesAnalytics: async (): Promise<{ student?: ILanguage[]; teacher?: ILanguage[] }> => {
      try {
        const data: Record<string, ILanguage[]> = {};

        for (let i = 0; i < ROLES.length; i++) {
          const users = await User.find({ role: ROLES[i] }).populate({
            path: 'profile',
            populate: {
              path: 'languages',
            },
          });

          const languages = flatten(users.map((user) => user.profile.languages));

          const rating = await Language.aggregate([
            { $match: { $or: languages } },
            {
              $group: {
                _id: '$name',
                count: { $avg: '$value' },
              },
            },
            {
              $project: {
                name: '$_id',
                value: '$count',
                _id: false,
              },
            },
          ]);

          data[ROLES[i]] = rating;
        }

        return data;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  },
};

export default resolvers;
