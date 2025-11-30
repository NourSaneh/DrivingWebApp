import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

export async function getClient() {
  if (!uri) {
    throw new Error(
      "Missing MongoDB connection string. Set `MONGO_URI` or `MONGODB_URI` environment variable."
    );
  }

  // Persist the client on globalThis to reuse across Vercel serverless invocations
  if (globalThis._mongoClient) return globalThis._mongoClient;

  const client = new MongoClient(uri);
  await client.connect();
  globalThis._mongoClient = client;
  return client;
}

export default getClient;
