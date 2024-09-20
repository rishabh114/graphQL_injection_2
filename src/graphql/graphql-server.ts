// graphql-server.ts
import { graphql, GraphQLSchema } from 'graphql';
import {
  InvalidRequestError,
  ModerationNudgeError,
  CustomErrorType, // Define custom errors in errorTypes.ts
} from './errorTypes';

interface GraphQLRequest {
  text: string; // Source: Untrusted user input via GraphQL query
}

interface GraphQLResponse {
  data?: any;
  errors: CustomErrorType[];
}

export async function executeGraphQLQuery(
  schema: GraphQLSchema,
  request: GraphQLRequest,
  rootValue: any,
  contextValue: any,
  variables: any
): Promise<GraphQLResponse> {
  return graphql({
    schema: schema,
    source: request.text, // Source: User input being processed
    rootValue: rootValue,
    contextValue: contextValue,
    variableValues: variables
  }).then((payload) => { // Sink: GraphQL query execution
    if (payload.errors) {
      payload.errors.forEach((e) => {
        if (
          e.originalError instanceof InvalidRequestError ||
          e.originalError instanceof ModerationNudgeError
        ) {
          throw e.originalError; // Sink: Custom error propagation
        }
      });
      throw new Error(payload.errors.toString()); // Sink: Improper error handling
    }
    return {
      data: payload.data || undefined,
      errors: payload.errors || [],
    };
  });
}
