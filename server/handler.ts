import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { ApolloServer } from 'apollo-server-lambda';

import { typeDefs, resolvers } from './graphql';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
});

export const graphql: APIGatewayProxyHandler = server.createHandler({
  cors: {
    origin: '*',
  }
});
