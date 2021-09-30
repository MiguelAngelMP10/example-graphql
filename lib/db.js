'use strict'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
dotenv.config()

const {
  DB_USER,
  DB_PASSWD,
  DB_HOST,
  DB_NAME
} = process.env

const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWD}@${DB_HOST}/${DB_NAME}`
console.log(mongoUrl)
let connection

async function connectDB () {
  if (connection) return connection

  let client
  try {
    client = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true
    })
    connection = client.db(DB_NAME)
  } catch (error) {
    console.error('Could not connect to db', mongoUrl, error)
    process.exit(1)
  }

  return connection
}

export default connectDB
