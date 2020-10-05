const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

// Construct a schema, using GraphQL shema language
const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

