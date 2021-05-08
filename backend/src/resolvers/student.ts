import { ICourse, IUser } from '../types';
import { Group, Profile, User } from '../models';

export const removeStudentFromGroup = async (_: void, { userId, groupId }: { userId: string, groupId: string }): Promise<IUser | undefined> => {
  try {
    const user = await User.findById(userId).populate('profile');

    const group = await Group.findByIdAndUpdate(groupId, {
      $pull: {
        students: user?._id as any,
      },
    }, { new: true, useFindAndModify: false });

    await Profile.findByIdAndUpdate(user?.profile._id, {
      $pull: {
        groups: group?._id as any,
      },
    }, { new: true, useFindAndModify: false });

    return user?.populate({
      path: 'profile',
      populate: {
        path: 'languages',
      },
    }).execPopulate();
  } catch(e) {
    throw e;
  }
};

const resolvers = {
  Mutation: {
    addStudentToGroup: async (_: void, { userId, groupId }: { userId: string, groupId: string }): Promise<IUser | undefined> => {
      try {
        const user = await User.findById(userId).populate('profile');
        const group = await Group.findById(groupId).populate('course');

        if (group) {
          await Profile.findByIdAndUpdate(user?.profile._id, {
            $addToSet: {
              groups: group,
            },
            debt: (group.course as ICourse).price,
          }, { new: true, useFindAndModify: false });

          await Group.updateOne({
            $addToSet: {
              students: user,
            },
          });
        }

        return user?.populate({
          path: 'profile',
          populate: {
            path: 'languages',
          },
        }).execPopulate();
      } catch (e) {
        throw e;
      }
    },
    removeStudentFromGroup,
  },
};

export default resolvers;
