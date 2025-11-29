import { connectDB } from "./_db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Not allowed" });
  }

  const db = await connectDB();
  const { completedTopics } = req.body;

  await db.collection("studyprogresses").updateOne(
    { userId: 1 },
    { $set: { completedTopics } },
    { upsert: true }
  );

  return res.status(200).json({ ok: true });
}
