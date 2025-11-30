import { getClient } from "../mongodb.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { completedTopics } = req.body;

    if (!Array.isArray(completedTopics)) {
      return res.status(400).json({ error: "Invalid data format" });
    }

    const client = await getClient();
    const db = client.db(process.env.MONGO_DB_NAME || "drivingdb");

    await db.collection("progress").updateOne(
      { userId: "default-user" }, // change later when adding accounts
      {
        $set: {
          completedTopics,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    res.status(200).json({ success: true });
  } catch (e) {
    console.error("SAVE ERROR:", e);
    res.status(500).json({ error: "Server error" });
  }
}
