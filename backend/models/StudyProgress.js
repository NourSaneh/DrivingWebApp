const mongoose = require("mongoose");

const StudyProgressSchema = new mongoose.Schema({
  userId: String,        // or email, or any ID you choose
  completedTopics: [String], // array of topic IDs
});

module.exports = mongoose.model("StudyProgress", StudyProgressSchema);
