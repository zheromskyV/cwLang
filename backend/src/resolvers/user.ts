import { ApolloError } from 'apollo-server';
import { hash } from 'bcrypt';
import { omit } from 'lodash';

import { SALT_ROUNDS } from '../constants';
import { Language, Profile, User } from '../models';
import { IUser } from '../types/user.interface';

const resolvers = {
  Mutation: {
    createUser: async (_: void, { user }: { user: IUser }): Promise<IUser | null> => {
      try {
        const existingUser: IUser | null = await User.findOne({
          email: user?.email,
        });

        if (existingUser) {
          throw new ApolloError('User has already exist');
        }

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
          },
        });
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    updateUser: async (_: void, { id, user }: { id: string; user: IUser }): Promise<IUser | null> => {
      try {
        const outdatedUser = await User.findById(id);

        if (outdatedUser) {
          await Language.remove(outdatedUser.profile.languages);

          const createdLanguages = await Language.insertMany(user.profile.languages);

          await Profile.findByIdAndUpdate(outdatedUser.profile, {
            ...user.profile,
            languages: createdLanguages,
          },
          { new: true, useFindAndModify: false });
        }

        const updatedUser = await User.findByIdAndUpdate(
          id,
          omit(user, ['languages', 'profile']),
          { new: true, useFindAndModify: false }
        );

        return User.findById(updatedUser?._id).populate({
          path: 'profile',
          populate: {
            path: 'languages',
          },
        });
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  },
  Query: {
    getUsersByRole: async (_: void, { role }: { role: string }): Promise<IUser[]> => {
      return User.find({ role }).populate({
        path: 'profile',
        populate: {
          path: 'languages',
        }
      });
    },
  },
};

export default resolvers;
