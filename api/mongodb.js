import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
if (!uri) throw new Error("Missing MONGO_URI environment variable");

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri); // modern syntax (no deprecated options)
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
