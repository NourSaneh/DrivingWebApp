import { connectDB } from "./_db.js";

export default async function handler(req, res) {
  try {
    const db = await connectDB();

    if (req.method === "GET") {
      const topics = await db.collection("topics").find().toArray();
      return res.status(200).json(topics);
    }

    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      const result = await db.collection("topics").insertOne(body);
      return res.status(201).json({ insertedId: result.insertedId });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
