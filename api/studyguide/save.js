import clientPromise from "../mongodb.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { topicId, progress } = req.body;

    const client = await clientPromise;
    const db = client.db("drivingdb");

    await db.collection("progress").updateOne(
      { topicId },
      { $set: { progress, updatedAt: new Date() } },
      { upsert: true }
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
