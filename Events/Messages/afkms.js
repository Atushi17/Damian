const { Message, MessageEmbed } = require('discord.js');
const Schema = require('../../Structures/Schema/afksc');

module.exports = {
	name: 'messageCreate',
	/**
	 *
	 * @param {Message} message
	 */
	async execute(message) {
		if (message.author.bot) return;

		const checkafk = await Schema.findOne({
			Guild: message.guild.id,
			User: message.author.id,
		});

		if (checkafk) {
			const dataDeletedEmbed = new MessageEmbed()
				.setDescription(
					` You are no longer AFK! , You had ${checkafk.pings} mention(s) while you were afk.`
				)
				.setColor('BLUE');

			checkafk.delete();

			message.channel.send({ embeds: [dataDeletedEmbed] });
		}

		const mentionedUser = message.mentions.users.first();
		if (mentionedUser) {
			const data = await Schema.findOne({
				Guild: message.guild.id,
				User: mentionedUser.id,
			});

			if (data) {
				const embed = new MessageEmbed()
					.setTitle(`:zzz: ${mentionedUser.username} is currently AFK!`)
					.setColor('YELLOW')
					.setDescription(
						`Reason: ${data.Reason} \n Since: <t:${Math.round(
							data.Date / 1000
						)}:R>`
					);

				message.reply({ embeds: [embed] });
				let new_ping = data.pings + 1;
				await data.update({ pings: new_ping });
			}
			data.save();
		}
	},
};
