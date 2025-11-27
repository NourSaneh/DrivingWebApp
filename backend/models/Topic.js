const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
  id: String,
  title: String,
  summary: String,
  content: String,
  tags: [String],
  estimatedMins: Number,
});

module.exports = mongoose.model("Topic", TopicSchema);
