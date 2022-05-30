const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  weight: { type: Number, required: true },
  inputs: [{
    input_name: { type: String, required: true },
    value: { type: Object, required: true }
  }],
  expected: { type: Object },
  challenge: {
    type: mongoose.Schema.Types.ObjectId, ref: 'challenge'
  }
}, { timestamps: true });

module.exports = Test = mongoose.model("test", testSchema);
