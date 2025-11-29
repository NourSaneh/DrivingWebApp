import { connectDB } from "./_db.js";

export default async function handler(req, res) {
  const db = await connectDB();
  const row = await db.collection("studyprogresses").findOne({ userId: 1 });
  return res.status(200).json(row || { completedTopics: [] });
}
