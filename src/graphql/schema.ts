import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'Hello world!',
    },
  },
});

export default new GraphQLSchema({ query: QueryType });
