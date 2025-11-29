import { getDB } from "../_db.js";

export default async function handler(req, res) {
  const { completedTopics } = req.body;

  const db = await getDB();
  await db.collection("study").updateOne(
    { id: 1 },
    { $set: { completedTopics } },
    { upsert: true }
  );

  return res.status(200).json({ ok: true });
}
