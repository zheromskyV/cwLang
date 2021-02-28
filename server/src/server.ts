import { ApolloServer } from 'apollo-server';

import { connectToDB } from './dataBase';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
// import { authenticateUser } from './src/utils/helpers';

connectToDB();

// let graphqlHandler;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});


server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
