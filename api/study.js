import { connectDB } from "./_db";
import StudyProgress from "./models/StudyProgress";

const FIXED_ID = "studyguide";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const record = await StudyProgress.findOne({ userId: FIXED_ID });
    return res.json(record || { userId: FIXED_ID, completedTopics: [] });
  }

  res.status(405).json({ message: "Method not allowed" });
}
