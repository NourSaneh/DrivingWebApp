import { getDB } from "./_db.js";

export default async function handler(req, res) {
  const db = await getDB();
  const saved = await db.collection("study").findOne({ id: 1 }) || { completedTopics: [] };
  return res.status(200).json(saved);
}
