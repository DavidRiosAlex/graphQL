import resolvers from './resolvers/resolvers';
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
    type Query {
        getUsers: [User]
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
        access(input: UserLoggingFields): LoggingType
    }
    
    type LoggingType{
        token: String
        refresh_token: String
        user: User
    }

    input UserLoggingFields{
        username: String!,
        password: String!
    }

    # variables para postear un usuario
    input UserInput{
        #nombre del usuario
        name: String!,
        #apellido del usuario
        lastname: String!,
        #nick, apodo, o nombre para la cuenta del usuario
        username: String!,
        #contraseña para la cuenta del usuario
        password: String!
    }

`;

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
