const mongoose = require("mongoose");

const autoroles = mongoose.Schema({
    Guild: String,
    roles: [String],
});

module.exports = mongoose.model("autoroles", autoroles);