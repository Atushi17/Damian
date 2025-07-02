const mongoose = require('mongoose');

const afkSchema = mongoose.Schema({
	Guild: String,
	User: String,
	Reason: String,
	Date: String,
	pings: Number,
});

module.exports = mongoose.model('afkk', afkSchema);
