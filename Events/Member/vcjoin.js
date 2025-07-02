const { MessageEmbed, Client } = require('discord.js');
const schema = require('../../Structures/Schema/joinvcsc');

module.exports = {
	name: 'voiceStateUpdate',

	async execute(oldState, newState, client) {
		let userid = oldState.id || newState.id;
		let guildid = oldState.guild.id || newState.guild.id;
		let guild = client.guilds.cache.find((val) => val.id === guildid);
		let author = guild.members.cache.find((val) => val.id === userid);

		if (oldState.channel === null && newState.channel === null) return;

		var oldChannelName;
		var newChannelName;

		if (
			!oldState.channelId &&
			newState.channelId &&
			!oldState.channel &&
			newState.channel
		) {
			schema.findOne({ GuildID: guildid }, async (err, data) => {
				if (err) throw err;
				if (!data) return;
				if (data) {
					let role = data.RoleID;
					const check = guild.roles.cache.get(role);
					if (!check) return schema.findOneAndDelete({ GuildID: guildid });
					newState.member.roles.add(role);
				}
			});
		}

		if (
			oldState.channelId &&
			!newState.channelId &&
			oldState.channel &&
			!newState.channel
		) {
			schema.findOne({ GuildID: guildid }, async (err, data) => {
				if (err) throw err;
				if (!data) return;
				if (data) {
					let role = data.RoleID;
					const check = guild.roles.cache.get(role);
					if (!check) return schema.findOneAndDelete({ GuildID: guildid });
					newState.member.roles.remove(role);
				}
			});
		}

		if (
			oldState.channelId &&
			newState.channelId &&
			oldState.channel &&
			newState.channel
		)
			return;
	},
};
