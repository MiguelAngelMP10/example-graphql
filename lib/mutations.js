'use strict'

import connectDb from './db.js';

export default {
    createCourse: async (root, { input }) => {
        const defaults = {
            teacher: '',
            topic: ''
        }

        const newCourse = Object.assign(defaults, input)
        let db
        let course

        try {
            db = await connectDb()
            course = await db.collection('courses').insertOne(newCourse)
            newCourse._id = course.insertedId
        } catch (error) {
            console.error(error)
        }

        return newCourse
    }
}