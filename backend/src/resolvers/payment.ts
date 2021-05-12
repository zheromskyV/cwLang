import { Profile, User } from '../models';

const resolvers = {
  Mutation: {
    makePayment: async (
      _: void,
      { userId, paymentAmount }: { userId: string; paymentAmount: number }
    ): Promise<void> => {
      const user = await User.findById(userId).populate('profile');

      if (user) {
        const obsoleteDebt = user.profile.debt || 0;
        const currentDebt = obsoleteDebt - paymentAmount;

        await Profile.findByIdAndUpdate(
          user?.profile._id,
          {
            debt: currentDebt,
          },
          { new: true, useFindAndModify: false }
        );
      }
    },
    addDiscount: async (_: void, { userId, discount }: { userId: string; discount: number }): Promise<void> => {
      const user = await User.findById(userId).populate('profile');

      if (user) {
        await Profile.findByIdAndUpdate(
          user?.profile._id,
          {
            discount,
          },
          { new: true, useFindAndModify: false }
        );
      }
    },
  },
};

export default resolvers;
