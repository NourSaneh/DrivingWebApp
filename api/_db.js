import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("❌ Missing MONGODB_URI in Vercel Environment Variables");
}

let client;
let clientPromise;

// Use globalThis to avoid crashes on Vercel (Node 20)
if (!globalThis._mongoClientPromise) {
  client = new MongoClient(uri, {
    maxPoolSize: 10,
  });

  globalThis._mongoClientPromise = client.connect();
}

clientPromise = globalThis._mongoClientPromise;

// Return connected DB instance
export async function connectDB() {
  const client = await clientPromise;
  return client.db("drivingdb");
}
