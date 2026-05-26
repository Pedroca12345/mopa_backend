const mongoose = require("mongoose");

const partsSchema = new mongoose.Schema({
  partcode: String,
  quantity: Number,
  location: String,
});

const Part = mongoose.model("Part", partSchema);

module.exports = Part;