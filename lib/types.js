'use strict'

import connectDb from './db.js'
import { ObjectId } from 'mongodb'

export default {
  Course: {
    people: async ({ people }) => {
      let db
      let peopleData
      let ids
      try {
        db = await connectDb()
        ids = people ? people.map(id => ObjectId(id)) : []
        peopleData = ids.length > 0
          ? await db.collection('students').find(
              { _id: { $in: ids } }
            ).toArray()
          : []
      } catch (error) {
        console.error(error)
      }

      return peopleData
    }
  }
}
