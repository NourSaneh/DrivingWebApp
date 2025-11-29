import { MongoClient } from "mongodb";

let client = null;

export async function getDB() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
  }
  return client.db("drivingdb");
}
