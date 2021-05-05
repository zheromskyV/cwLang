import { Profile, User } from '../models';
import { ISchedule } from '../types';

const resolvers = {
  Query: {
    getUserSchedule: async (_: void, { id }: { id: string }): Promise<ISchedule[]> => {
      const user = await User.findById(id);
      if (user) {
        const profile = await Profile.findById(user?.profile)
          .populate({
            path: 'groups',
            populate: {
              path: 'schedule',
            }
          });

        if (profile?.groups) {
          return profile.groups.map((profile) => profile.schedule);
        }
      }

      return [];
    }
  },
};

export default resolvers;
