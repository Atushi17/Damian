const mongoose = require('mongoose');

const afkSchema = mongoose.Schema({
	Guild: String,
	Roles: [String],
});

module.exports = mongoose.model('afkrole', afkSchema);
