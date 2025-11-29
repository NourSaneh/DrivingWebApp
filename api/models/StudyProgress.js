import mongoose from "mongoose";

const StudyProgressSchema = new mongoose.Schema({
  userId: String,
  completedTopics: [String],
});

export default mongoose.models.StudyProgress ||
  mongoose.model("StudyProgress", StudyProgressSchema);
