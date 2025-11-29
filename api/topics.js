import { connectDB } from "./_db.js";

export default async function handler(req, res) {
  const db = await connectDB();
  const topics = await db.collection("topics").find().toArray();
  return res.status(200).json(topics);
}
