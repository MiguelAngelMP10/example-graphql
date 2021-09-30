'use strict'

import connectDb from './db.js';
import { ObjectId } from 'mongodb';

export default{
    getCourses: async () => {
        let db
        let courses = []

        try {
            db = await connectDb()
            courses = await db.collection('courses').find().toArray()
        } catch (error) {
            console.error(error)
        }

        return courses
    },
    getCourse: async (root, {
        id
    }) => {
        let db
        let course

        try {
            db = await connectDb()
            course = await db.collection('courses').findOne({
                _id: ObjectId(id)
            })
        } catch (error) {
            console.error(error)
        }

        return course
    }
}