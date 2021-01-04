import resolvers from './resolvers/resolvers';

const typeDefs = `
    type Query {
        user(token: String!): UserQuerys
        task(token: String!): Task
        access: String
    }
    type UserQuerys{
        get: [User]
        post: String
    }
    type Task{
        get: String
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
`

export default {
    typeDefs, 
    resolvers
};