import { connect, connection } from 'mongoose';

const MONGO_CONNECTION_STRING =
  'mongodb+srv://user:user@cluster0.qqtfy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

export const connectToDB = () => {
  connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  });

  const db = connection;

  db.on('error', console.error.bind(console, 'Connection error: '));
  db.once('open', () => {
    console.log('Connected to database!');
  });
};
