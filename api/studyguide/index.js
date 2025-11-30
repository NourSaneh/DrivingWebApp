import clientPromise from "../mongodb.js";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("drivingdb");

    const topics = await db.collection("topics").find().toArray();

    res.status(200).json(topics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
