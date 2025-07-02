const mongoose = require('mongoose');

const giveSchema = mongoose.Schema({
	Guild: String,
	Roles: [String],
});

module.exports = mongoose.model('giveawayrole', giveSchema);
