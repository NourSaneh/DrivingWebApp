import connectDB from "../models/_db";
import Topic from "../models/Topic";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Only POST allowed" });

  try {
    await connectDB();

    const topics = [
      {
        id: "1",
        title: "Traffic Signs & Signals",
        summary: "Common road signs, meanings, and actions required.",
        content:
          "Study stop signs, yield signs, regulatory signs, warning signs, and traffic signals. Learn colors and shapes to recognize meaning quickly.",
        tags: ["Signs", "Basics"],
        estimatedMins: 20,
      },
      {
        id: "2",
        title: "Right-of-Way Rules",
        summary: "Who yields and when at intersections.",
        content:
          "Understand four-way stops, uncontrolled intersections, turning vehicles vs pedestrians, and emergency vehicle rules.",
        tags: ["Rules", "Intersections"],
        estimatedMins: 25,
      },
      {
        id: "3",
        title: "Safe Following & Stopping",
        summary: "Keeping safe distances and proper braking techniques.",
        content:
          "Use the 3-second rule, adjust for weather, avoid tailgating, and practice controlled stops.",
        tags: ["Safety", "Driving"],
        estimatedMins: 15,
      },
      {
        id: "4",
        title: "Lane Management & Merging",
        summary: "Proper lane usage, signaling, and merging onto highways.",
        content:
          "Check mirrors and blind spots, signal early, match speed for safe merges, and know HOV rules.",
        tags: ["Highway", "Maneuvers"],
        estimatedMins: 20,
      },
    ];

    await Topic.deleteMany({});
    await Topic.insertMany(topics);

    res.status(200).json({ message: "Topics seeded successfully!" });
  } catch (err) {
    console.error("Seed error:", err);
    res.status(500).json({ error: "Seeding failed" });
  }
}
