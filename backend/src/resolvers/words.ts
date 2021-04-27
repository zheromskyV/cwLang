import { Word } from '../models';
import { IWord } from '../types';

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
  },
  Query: {
    listWords: async ( _: void, { targetLang, initialLang }: { targetLang: string, initialLang: string }): Promise<IWord[]> => {
      try {
        const listWords = await Word.find({
          targetLang,
          initialLang,
        });

        return listWords;
      } catch(e) {
        console.error(e);
        throw e;
      }
    },
  },
};

export default resolvers;
