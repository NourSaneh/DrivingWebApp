const mongoose = require("mongoose");
const Topic = require("./models/Topic");

// 1️⃣ Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/drivingdb")
  .then(() => console.log("Connected to MongoDB…"))
  .catch((err) => console.error(err));

// 2️⃣ Your topics data
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

// 3️⃣ Remove old topics + insert new ones
(async () => {
  try {
    await Topic.deleteMany({});
    await Topic.insertMany(topics);

    console.log("🌟 Topics added successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
})();
