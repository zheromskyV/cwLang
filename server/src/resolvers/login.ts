import { compare } from 'bcrypt';

import { User } from '../models';

export default {
  Mutation: {
    login: async (_: void, { email, password }: { email: string; password: string }): Promise<boolean> => {
      const user = await User.findOne({ email });

      console.log(user);
      if (user) {
        const isCorrectPassword = await compare(password, user.password);

        return isCorrectPassword;
      }

      return false;
    },
  },
};
