import { connectDB } from "./_db.js";

const FIXED_ID = "studyguide";

export default async function handler(req, res) {
  try {
    const db = await connectDB();

    if (req.method === "GET") {
      const record = await db
        .collection("studyprogresses")
        .findOne({ userId: FIXED_ID });

      return res.json(
        record || { userId: FIXED_ID, completedTopics: [] }
      );
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
