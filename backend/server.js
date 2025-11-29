const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const StudyProgress = require("./models/StudyProgress");
const Topic = require("./models/Topic");

const app = express();

/* --------------------------------------------------
   CORS — required for Vercel → Render communication
-------------------------------------------------- */

const allowedOrigins = [
  "http://localhost:5173",
  "https://driving-web-app.vercel.app",
  "https://driving-web-app-git-main-noursanehs-projects.vercel.app",
  undefined, // ← Important: Render sometimes sends no origin
  null
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("🚫 BLOCKED BY CORS:", origin);
        callback(new Error("CORS blocked"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

/* --------------------------------------------------
   Middleware
-------------------------------------------------- */
app.use(express.json());

/* --------------------------------------------------
   Connect to MongoDB Atlas
-------------------------------------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

/* --------------------------------------------------
   CONSTANT ID for progress saving
-------------------------------------------------- */
const FIXED_ID = "studyguide";

/* --------------------------------------------------
   Load Study Progress
-------------------------------------------------- */
app.get("/api/study", async (req, res) => {
  try {
    const record = await StudyProgress.findOne({ userId: FIXED_ID });
    res.json(record || { userId: FIXED_ID, completedTopics: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error loading progress" });
  }
});

/* --------------------------------------------------
   Save Study Progress
-------------------------------------------------- */
app.post("/api/study/save", async (req, res) => {
  const { completedTopics } = req.body;

  try {
    let record = await StudyProgress.findOne({ userId: FIXED_ID });

    if (!record) {
      record = new StudyProgress({ userId: FIXED_ID, completedTopics });
    } else {
      record.completedTopics = completedTopics;
    }

    await record.save();
    res.json({ message: "Progress saved", record });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving progress" });
  }
});

/* --------------------------------------------------
   Get All Topics
-------------------------------------------------- */
app.get("/api/topics", async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error loading topics" });
  }
});

/* --------------------------------------------------
   Add New Topic
-------------------------------------------------- */
app.post("/api/topics", async (req, res) => {
  try {
    const topic = new Topic(req.body);
    await topic.save();
    res.json({ message: "Topic added", topic });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding topic" });
  }
});

/* --------------------------------------------------
   Root route
-------------------------------------------------- */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* --------------------------------------------------
   Start Server (Render compatible)
-------------------------------------------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
