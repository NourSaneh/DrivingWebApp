import { connectDB } from "./_db";
import StudyProgress from "./models/StudyProgress";

const FIXED_ID = "studyguide";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const { completedTopics } = req.body;

    let record = await StudyProgress.findOne({ userId: FIXED_ID });

    if (!record) {
      record = new StudyProgress({ userId: FIXED_ID, completedTopics });
    } else {
      record.completedTopics = completedTopics;
    }

    await record.save();
    return res.json({ message: "Saved", record });
  }

  res.status(405).json({ message: "Method not allowed" });
}
