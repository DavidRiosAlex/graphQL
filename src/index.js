import express from 'express';
import mongoose from 'mongoose';
import {graphqlHTTP, GraphQLParams} from 'express-graphql';
import {development, cors} from './constants/variables';
import schema from './schemas';
import {buildSchema} from 'graphql';

mongoose.connect(
    process.env.MONGO_CONNECTION_STRING,
    JSON.parse(process.env.MONGO_CONNECTION_PARAMS),
);

mongoose.connection.on('error', () => {
  const exit = process.exit;
  exit(1);
});

mongoose.set('debug', true);

const app = express();
app.use(cors);
app.use((req,res,next)=>{
  console.log();
  next();
})

app.use('/access/graphql', graphqlHTTP(({headers})=>{
return {
  schema: schema,
  context:{
    req: headers
  },
  graphiql: development
}}));

app.listen(3000,
    ()=>console.log('server on port 3000  localhost:3000/graphql'),
);
