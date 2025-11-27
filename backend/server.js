const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const StudyProgress = require("./models/StudyProgress");
const Topic = require("./models/Topic"); // <-- NEW

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// CONNECT TO LOCAL MONGO
mongoose
  .connect("mongodb://127.0.0.1:27017/drivingdb")
  .then(() => console.log("✅ Connected to MongoDB (drivingdb)"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

/* ----------------------------
   FIXED ID FOR STUDY GUIDE
----------------------------- */
const FIXED_ID = "studyguide";

/* ----------------------------
   LOAD STUDY PROGRESS
----------------------------- */
app.get("/api/study", async (req, res) => {
  try {
    const record = await StudyProgress.findOne({ userId: FIXED_ID });
    res.json(record || { userId: FIXED_ID, completedTopics: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error loading progress" });
  }
});

/* ----------------------------
   SAVE STUDY PROGRESS
----------------------------- */
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

/* ----------------------------
       TOPICS: GET ALL
----------------------------- */
app.get("/api/topics", async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error loading topics" });
  }
});

/* ----------------------------
       TOPICS: ADD NEW TOPIC
----------------------------- */
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

/* ----------------------------
   SERVER START
----------------------------- */
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
