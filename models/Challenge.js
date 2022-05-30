const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
  name: {
    type: String, required: true,
  },
  level: {
    type: String, required: true,
  },
  language: {
    type: String,
    required: true,
  },
  description: {
    type: String, required: true
  },
  func_name: {
    type: String, require: true
  },
  output: {
    type: String, require: true,
  },
}, { timestamps: true });

module.exports = Challenge = mongoose.model("challenge", challengeSchema);
