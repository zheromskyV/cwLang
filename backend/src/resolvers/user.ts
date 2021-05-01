import { hash } from 'bcrypt';
import { omit } from 'lodash';

import { SALT_ROUNDS } from '../constants';
import { Language, Profile, User } from '../models';
import { IUser } from '../types/user.interface';

const resolvers = {
  Mutation: {
    createUser: async (_: void, { user }: { user: IUser }): Promise<IUser | null> => {
      try {
        const hashedPassword = await hash(user.password, SALT_ROUNDS);

        const languages = await Language.insertMany(user.profile.languages);

        const profile = await Profile.create({
          ...user.profile,
          languages: languages.map((language) => language._id),
        });

        const createdUser = await User.create({
          ...omit(user, 'languages'),
          password: hashedPassword,
          profile: profile._id,
        });

        return User.findById(createdUser._id).populate({
          path: 'profile',
          populate: {
            path: 'languages',
          }
        });
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    updateUser: async (_: void, { id, user }: { id: string, user: IUser }): Promise<IUser | null> => {
      try {
        const outdatedUser = await User.findById(id);

        if (outdatedUser) {
          await Language.remove(outdatedUser.profile.languages);

          const createdLanguages = await Language.insertMany(user.profile.languages);

          await Profile.findByIdAndUpdate(outdatedUser.profile, {
            ...user.profile,
            languages: createdLanguages,
          });
        }

        const updatedUser = await User.findByIdAndUpdate(id, omit(user, ['languages', 'profile']));

        return User.findById(updatedUser?._id).populate({
          path: 'profile',
          populate: {
            path: 'languages',
          }
        });
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  },
};

export default resolvers;
