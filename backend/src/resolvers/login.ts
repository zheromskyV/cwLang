import { compare } from 'bcrypt';

import { IUser } from '../types';
import { User } from '../models';

export default {
  Mutation: {
    login: async (_: void, { email, password }: { email: string; password: string }): Promise<IUser | null> => {
      try {
        const user = await User.findOne({ email });

        if (user) {
          const isCorrectPassword = await compare(password, user.password);

          return isCorrectPassword ? User.findById(user._id).populate({
            path: 'profile',
            populate: {
              path: 'languages',
            }
          }) : null;
        }

        return null;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  },
};
