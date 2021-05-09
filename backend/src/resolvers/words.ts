import { Profile, User, Word } from '../models';
import { IWord } from '../types';
import { getUserCourses } from './course';

const resolvers = {
  Mutation: {
    createWord: async (_: void, { word }: { word: IWord }): Promise<IWord | null> => {
      try {
        const createdWord = await Word.create(word);

        return createdWord;
      } catch(e) {
        console.error(e);
        throw e;
      }
    },
    addFavoriteWord: async(_: void, { id, wordId }: { id: String, wordId: string }): Promise<void> => {
      try {
        const user = await User.findById(id);
        const word = await Word.findById(wordId);

        if (user) {
          await Profile.findByIdAndUpdate(user.profile, {
            $addToSet: {
              favoriteWords: word as IWord,
            },
          }, { new: true, useFindAndModify: false });
        }
      } catch(e) {
        console.error(e);
        throw e;
      }

    },
  },
  Query: {
    getWords: async (_: void, { targetLang, initialLang }: { targetLang: string, initialLang: string }): Promise<IWord[]> => {
      try {
        const words = await Word.find({
          targetLang,
          initialLang,
        });

        return words;
      } catch(e) {
        console.error(e);
        throw e;
      }
    },
    getAllUserWords: async(_: void, { id }: { id: String }): Promise<IWord[]> => {
      const courses = await getUserCourses(undefined, { id });

      return courses.map((course) => course.words).flat();
    },
    getFavoriteWords: async(_: void, { id }: { id: String }): Promise<IWord[] | undefined> => {
      const user = await User.findById(id).populate({
        path: 'profile',
        populate: {
          path: 'favoriteWords',
        },
      });

      return user?.profile.favoriteWords;
    },
  },
};

export default resolvers;
