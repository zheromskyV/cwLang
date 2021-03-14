import { hash } from 'bcrypt';

import { SALT_ROUNDS } from '../constants';
import { User } from '../models';
import { IUser } from '../types/user.interface';

const resolvers = {
  Mutation: {
    createUser: async (_: void, { user }: { user: IUser }): Promise<IUser> => {
      try {
        const hashedPassword = await hash(user.password, SALT_ROUNDS);
        const createdUser = await User.create({ ...user, password: hashedPassword });

        return createdUser;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  },
};

export default resolvers;
