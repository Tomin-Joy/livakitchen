// lib/mongodb.js

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const options = {};

// In production mode, use a single connection instance.
var client = new MongoClient(uri, options);
var clientPromise = client.connect();

export default clientPromise;
