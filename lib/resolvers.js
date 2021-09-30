'use strict'
import queries from './queries.js'
import mutations from './mutations.js'
import types from './types.js';

export default {
  Query: queries,
  Mutation: mutations, ...types
}
