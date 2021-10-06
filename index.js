'use strict'

import { makeExecutableSchema } from '@graphql-tools/schema'
import express from 'express'
import dotenv from 'dotenv'
import cors  from 'cors';
import { graphqlHTTP } from 'express-graphql'

import { readFileSync } from 'fs'
import { join } from 'path'

import resolvers from './lib/resolvers.js'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000
const isDev = process.env.NODE_ENV !== 'production'


app.use(cors())


// definiendo el esquema
const typeDefs = readFileSync(join('./', 'lib', 'schema.graphql'), 'utf-8')
const schema = makeExecutableSchema(
  {
    typeDefs,
    resolvers
  }
)

// Configurar los resolvers

app.use(
  '/api',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: isDev
  })
)

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/api`)
})
