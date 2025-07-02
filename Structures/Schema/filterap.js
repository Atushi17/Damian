const mongoose = require("mongoose");

const filter = mongoose.Schema({
  Guild: String,
  Words: [String],
});

module.exports = mongoose.model("filter", filter);