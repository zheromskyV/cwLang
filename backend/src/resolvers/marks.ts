import { Mark, Profile, User } from '../models';
import { IMark } from '../types';

const resolvers = {
  Mutation: {
    addMark: async(_: void, { userId, mark }: { userId: string, mark: IMark }): Promise<IMark> => {
      try {
        const user = await User.findById(userId).populate('profile');

        const createdMark = await Mark.create({
          ...mark,
          date: new Date(),
        });

        await Profile.findByIdAndUpdate(user?.profile._id, {
          $addToSet: {
            marks: createdMark,
          },
        }, { new: true, useFindAndModify: false });

        const average = await Profile.aggregate([
          { '$match': { '_id': user?.profile._id } },
          { '$lookup': {
            'from': Mark.collection.name,
            'localField': 'marks',
            'foreignField': '_id',
            'as': 'marks'
          }},
          {
            '$project': {
              'rating': { '$avg': '$marks.value' }
            }
          }
        ]);

        await Profile.findByIdAndUpdate(user?.profile._id, {
          rating: average[0].rating,
        }, { new: true, useFindAndModify: false });

        return createdMark;
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  },
  Query: {
    getUserMarks: async(_: void, { userId }: { userId: string }): Promise<IMark[]> => {
      try {
        const user = await User.findById(userId).populate({
          path: 'profile',
          populate: {
            path: 'marks',
          }
        });

        return user?.profile.marks || [];
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  },
};

export default resolvers;
