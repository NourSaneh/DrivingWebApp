import { MongoClient } from "mongodb";

const uri = (process.env.MONGODB_URI || process.env.MONGO_URI || "").trim();

if (!uri) {
  // Keep the throw so failures are obvious
  throw new Error("❌ Missing MONGODB_URI in Vercel Environment Variables");
}

// Reuse a single client across invocations
let clientPromise;
if (!globalThis._mongoClientPromise) {
  const client = new MongoClient(uri, { maxPoolSize: 10 });
  globalThis._mongoClientPromise = client.connect();
}
clientPromise = globalThis._mongoClientPromise;

export async function connectDB() {
  const client = await clientPromise;
  return client.db("drivingdb");
}
