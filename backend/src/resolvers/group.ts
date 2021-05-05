import { omit } from 'lodash';

import { Group, Profile, Schedule, User } from '../models';
import { IGroup, IUser } from '../types';

const resolvers = {
  Mutation: {
    createGroup: async (_: void, { group }: { group: IGroup }): Promise<IGroup | null> => {
      try {
        const schedule = await Schedule.create(group.schedule);
        const createdGroup = await Group.create({
          ...group,
          schedule,
        });

        await Profile.findByIdAndUpdate(group.teacher, {
          $push: {
            groups: createdGroup,
          },
        });

        return createdGroup
          .populate('teacher')
          .populate({
            path: 'course',
            populate: {
              path: 'words',
            }
          })
          .populate('schedule')
          .populate('students')
          .execPopulate();
      } catch(e) {
        console.error(e);
        throw e;
      }
    },
    updateGroup: async (_: void, { id, group }: { id: string, group: IGroup }): Promise<IGroup | undefined> => {
      try {
        const outdatedGroup = await Group.findById(id).populate('teacher');
        const updatedGroup = await Group
          .findByIdAndUpdate(id, omit(group, 'schedule'), { new: true, useFindAndModify: false })
          .populate('teacher');

        if (JSON.stringify(outdatedGroup?.teacher) !== JSON.stringify(updatedGroup?.teacher)) {
          await Profile.findByIdAndUpdate((updatedGroup!.teacher as IUser)?.profile, {
            $push: {
              groups: updatedGroup as IGroup,
            },
          },
          { new: true, useFindAndModify: false }
          );

          await Profile.findByIdAndUpdate((outdatedGroup!.teacher as IUser)?.profile,
            {
              $pull: {
                groups: { $in: [ updatedGroup!._id as any ] },
              },
            },
            { new: true, useFindAndModify: false },
          );
        }

        await Schedule.findByIdAndUpdate(updatedGroup?.schedule, group.schedule);

        return updatedGroup!
          .populate('teacher')
          .populate({
            path: 'course',
            populate: {
              path: 'words',
            }
          })
          .populate('schedule')
          .populate('students')
          .execPopulate();
      } catch(e) {
        console.error(e);
        throw e;
      }
    },
    deleteGroup: async (_: void, { id }: { id: string }): Promise<void> => {
      try {
        await Group.findByIdAndDelete(id);
      } catch(e) {
        console.error(e);
        throw e;
      }
    },
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
            }
          })
          .populate({
            path: 'course',
            populate: {
              path: 'words',
            }
          })
          .populate('schedule')
          .populate('students');
      } catch(e) {
        console.error(e);
        throw e;
      }
    },
    getUserGroups: async (_: void, { id }: { id: string }): Promise<IGroup[]> => {
      try {
        const user = await User.findById(id).populate('profile');

        if (user?.profile?.groups?.length) {
          return Group.find()
          .populate({
            path: 'teacher',
            match: { _id: id },
          })
          .populate({
            path: 'profile',
            populate: {
              path: 'languages',
            }
          })
          .populate({
            path: 'course',
            populate: {
              path: 'words',
            }
          })
          .populate('schedule')
          .populate('students');
        } else {
          return [];
        }
       } catch(e) {
        console.error(e);
        throw e;
      }
    },
  },
};

export default resolvers;
