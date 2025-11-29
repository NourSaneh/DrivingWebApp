import { connectDB } from "./_db.js";

const FIXED_ID = "studyguide";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const db = await connectDB();

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { completedTopics } = body;

    await db.collection("studyprogresses").updateOne(
      { userId: FIXED_ID },
      { $set: { completedTopics } },
      { upsert: true }
    );

    return res.json({ message: "Saved", completedTopics });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
