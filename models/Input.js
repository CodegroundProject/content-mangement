const mongoose = require("mongoose");

const inputSchema = new mongoose.Schema({
  input_name: { type: String, required: true },
  type: { type: String, require: true },
  challenge: {
    type: mongoose.Schema.Types.ObjectId, ref: 'challenge'
  }
}, { timestamps: true });

module.exports = Input = mongoose.model("input", inputSchema);
