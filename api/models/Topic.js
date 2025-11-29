import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
  id: String,
  title: String,
  summary: String,
  content: String,
  tags: [String],
  estimatedMins: Number,
});

export default mongoose.models.Topic ||
  mongoose.model("Topic", TopicSchema);
