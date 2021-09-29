"use strict";

import { graphql, buildSchema } from "graphql";
import express from "express";

const app = express();
import { graphqlHTTP } from "express-graphql";
const port = process.env.port || 3000;

// definiendo el esquema
const schema = buildSchema(`
  type Query {
    "Retorna un saludo al mundo"
    hello: String
  }
`);

// Configurar los resolvers
const resolvers = {
  hello: () => {
    return "Hola Mundo";
  },
};

app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/api`);
});
