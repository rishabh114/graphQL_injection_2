// server.ts
import express, { Request, Response } from 'express';
import { graphql, GraphQLSchema } from 'graphql';
import { executeGraphQLQuery } from './graphql/graphql-server';
import schema from './graphql/schema'; // Assume the schema is defined

const app = express();
app.use(express.json());

app.post('/graphql', async (req: Request, res: Response) => {
  const query = req.body.query; // Source: User input via GraphQL query
  try {
    const result = await executeGraphQLQuery(schema, { text: query }, {}, {}, {});
    res.json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Now 'error' is of type 'Error'
      res.status(500).send(error.message);
    } else {
      // Handle unexpected error type
      res.status(500).send('An unknown error occurred.');
    }
  }
});
