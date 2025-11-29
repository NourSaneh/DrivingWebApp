import { connectDB } from "./_db";
import Topic from "../models/Topic";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const topics = await Topic.find();
    return res.status(200).json(topics);
  }

  if (req.method === "POST") {
    const topic = await Topic.create(req.body);
    return res.status(201).json(topic);
  }

  res.status(405).json({ message: "Method not allowed" });
}
