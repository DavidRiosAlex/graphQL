import resolvers from './resolvers/resolvers';
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
    type Query {
        getUsers: [User]
        access: String
    }
    type User{
        name: String,
        lastname: String,
        encodedPassword: String,
        username: String,
        salt: String,
        enabled: Boolean,
        created: String,
        updated: String
    }
    type Mutation{
        postUser(input: UserInput): User
    }
    input UserInput{
        name: String!,
        lastname: String!,
        username: String!,
        password: String!
    }
`;

export default makeExecutableSchema({
  typeDefs,
  resolvers,
//   logger: {log:function(req) {console.log(req)}}
});
