import express from 'express';
import mongoose,{connect, set, connection} from 'mongoose';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

mongoose.connect(process.env.MONGO_CONNECTION_STRING, JSON.parse(process.env.MONGO_CONNECTION_PARAMS));

mongoose.connection.on('error', err => {
console.log('mongoose.connection error: ', err);
    let exit = process.exit;
    exit(1);
});

mongoose.set('debug', true);

const schema = buildSchema(`
    type Query{
        hello: String
    }
`);

const root = { hello: ()=> 'Hello world!'};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    // graphiql: true,
}))

app.listen(3000, ()=>console.log('server on port 3000  localhost:3000/graphql'));
