import express from 'express';
import mongoose from 'mongoose';
import { graphqlHTTP  } from 'express-graphql';
import { development, cors } from './constants/variables';
import schema from './schemas';
import { buildSchema } from 'graphql';

mongoose.connect(process.env.MONGO_CONNECTION_STRING, JSON.parse(process.env.MONGO_CONNECTION_PARAMS));

mongoose.connection.on('error', err => {
console.log('mongoose.connection error: ', err);
    let exit = process.exit;
    exit(1);
});

mongoose.set('debug', true);

const app = express();
app.use(cors);

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(schema.typeDefs),
    graphiql: development,
    rootValue: schema.resolvers
}))

app.listen(3000, ()=>console.log('server on port 3000  localhost:3000/graphql'));
