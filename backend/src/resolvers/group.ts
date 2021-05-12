import { omit } from 'lodash';

import { Group, Profile, Schedule, User } from '../models';
import { IGroup, IUser, Roles } from '../types';
import { removeStudentFromGroup } from './student';

export const deleteGroup = async (_: void, { id }: { id: string }): Promise<void> => {
  try {
    const group = await Group.findByIdAndDelete(id);

    if (group) {
      group.students?.forEach((student) => {
        removeStudentFromGroup(undefined, {
          userId: String(student._id),
          groupId: String(group._id),
        });
      });

      await User.findByIdAndUpdate(
        group.teacher,
        {
          $pull: {
            groups: group?._id as any,
          },
        },
        { new: true, useFindAndModify: false }
      );

      await Schedule.findByIdAndDelete(group.schedule);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const resolvers = {
  Mutation: {
    createGroup: async (_: void, { group }: { group: IGroup }): Promise<IGroup | null> => {
      try {
        const schedule = await Schedule.create(group.schedule);
        const createdGroup = await (
          await Group.create({
            ...group,
            schedule,
          })
        )
          .populate('teacher')
          .populate({
            path: 'course',
            populate: {
              path: 'words',
            },
          })
          .populate('schedule')
          .populate('students')
          .execPopulate();

        await Profile.findByIdAndUpdate(
          (createdGroup.teacher as IUser)?.profile,
          {
            $addToSet: {
              groups: createdGroup,
            },
          },
          { new: true, useFindAndModify: false }
        );

        return createdGroup;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    updateGroup: async (_: void, { id, group }: { id: string; group: IGroup }): Promise<IGroup | undefined> => {
      try {
        const outdatedGroup = await Group.findById(id).populate('teacher');
        const updatedGroup = await Group.findByIdAndUpdate(id, omit(group, 'schedule'), {
          new: true,
          useFindAndModify: false,
        }).populate('teacher');

        if (JSON.stringify(outdatedGroup?.teacher) !== JSON.stringify(updatedGroup?.teacher)) {
          await Profile.findByIdAndUpdate(
            (updatedGroup!.teacher as IUser)?.profile,
            {
              $push: {
                groups: updatedGroup as IGroup,
              },
            },
            { new: true, useFindAndModify: false }
          );

          await Profile.findByIdAndUpdate(
            (outdatedGroup!.teacher as IUser)?.profile,
            {
              $pull: {
                groups: { $in: [updatedGroup!._id as any] },
              },
            },
            { new: true, useFindAndModify: false }
          );
        }

        await Schedule.findByIdAndUpdate(updatedGroup?.schedule, group.schedule);

        return updatedGroup!
          .populate('teacher')
          .populate({
            path: 'course',
            populate: {
              path: 'words',
            },
          })
          .populate('schedule')
          .populate('students')
          .execPopulate();
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    deleteGroup,
  },
  Query: {
    getGroups: async (): Promise<IGroup[]> => {
      try {
        return Group.find()
          .populate('teacher')
          .populate({
            path: 'profile',
            populate: {
              path: 'languages',
            },
          })
          .populate({
            path: 'course',
            populate: {
              path: 'words',
            },
          })
          .populate('schedule')
          .populate({
            path: 'students',
            populate: {
              path: 'profile',
              populate: {
                path: 'languages',
              },
            },
          });
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    getUserGroups: async (_: void, { id }: { id: string }): Promise<IGroup[]> => {
      try {
        const user = await User.findById(id).populate('profile');

        if (user?.profile.groups) {
          const profile = await Profile.findById(user?.profile?._id).populate({
            path: 'groups',
            populate: [
              {
                path: 'course',
                populate: {
                  path: 'words',
                },
              },
              {
                path: 'schedule',
              },
              {
                path: 'students',
                populate: {
                  path: 'profile',
                },
              },
              {
                path: 'teacher',
                populate: {
                  path: 'profile',
                },
              },
            ],
          });

          return profile?.groups || [];
        }

        return [];
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  },
};

export default resolvers;
