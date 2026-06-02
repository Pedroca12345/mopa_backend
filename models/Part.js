const mongoose = require("mongoose");

const partSchema = new mongoose.Schema({
  partcode: String,
  quantity: Number,
  description: String,
  location: String,
});

const Part = mongoose.model("Part", partSchema);

module.exports = Part;