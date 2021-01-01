import express from 'express';
import {connect} from 'mongoose';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

connect('mongodb://graphql_db@graphql_db@graphql_mongodb/graphqlmongo?authMechanism=SCRAM-SHA-1&authSource=admin',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
})

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
