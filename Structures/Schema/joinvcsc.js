const { model, Schema } = require('mongoose');

module.exports = model(
	'Joinvc',
	new Schema({
		GuildID: String,
		RoleID: String,
	})
);
