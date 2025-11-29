import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("❌ Missing MONGODB_URI in Vercel Environment Variables");
}

// Global cache (prevents re-connecting on every request)
let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {
    maxPoolSize: 10,
  });

  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

// Return connected DB instance
export async function connectDB() {
  const client = await clientPromise;
  return client.db("drivingdb");  // <-- YOUR DATABASE NAME
}
