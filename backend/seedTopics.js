require("dotenv").config();
const mongoose = require("mongoose");
const Topic = require("./models/Topic");

// CONNECT TO MONGODB ATLAS
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🌍 Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ Connection error:", err));

// Topics data
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

// Delete old + insert new
Topic.deleteMany({})
  .then(() => Topic.insertMany(topics))
  .then(() => {
    console.log("🌟 Topics added successfully to Atlas!");
    mongoose.connection.close();
  })
  .catch((err) => console.error(err));
