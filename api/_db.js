import { MongoClient } from "mongodb";

let client = null;

const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
const dbName = process.env.MONGO_DB_NAME || "drivingdb";

export async function getDB() {
  if (!uri) {
    throw new Error(
      "Missing MongoDB connection string. Set `MONGO_URI` or `MONGODB_URI` environment variable."
    );
  }

  // Reuse a global MongoClient across lambda invocations on Vercel
  // to avoid exhausting connections.
  if (globalThis._mongoClient) {
    client = globalThis._mongoClient;
  }

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    globalThis._mongoClient = client;
  }

  return client.db(dbName);
}
