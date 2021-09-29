'use strict'

import { buildSchema } from 'graphql'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'

import { readFileSync } from 'fs'
import { join } from 'path'

import resolvers from './lib/resolvers.js'

const app = express()
const port = process.env.port || 3000

// definiendo el esquema
const schema = buildSchema(
  readFileSync(join('./', 'lib', 'schema.graphql'), 'utf-8')
)

// Configurar los resolvers

app.use(
  '/api',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
  })
)

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/api`)
})
