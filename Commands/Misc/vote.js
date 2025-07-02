const {
	Client,
	CommandInteraction,
	MessageEmbed,
	MessageActionRow,
	MessageButton,
} = require('discord.js');

module.exports = {
	name: 'vote',
	description: 'vote damian!!',
	usage: '/vote',
	/**
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction, client) {
		const embed = new MessageEmbed()
			.setColor('BLURPLE')
			.setAuthor({
				name: `Vote ${client.user.username}`,
				iconURL: client.user.avatarURL({ format: 'png' }),
			})
			.setDescription(
				`You can help me by voting Damian on Top.gg by clicking on the button below.\n\n
				**Thank you for supporting Damian 💝**
				And don't forget to give me 5⭐ review on [Top.gg](https://top.gg/bot/881212769700028497/vote) if you like <@881212769700028497> <:heart:939187281682653255>`
			)
			.setFooter({ text: interaction.user.tag })
			.setTimestamp()
			.setThumbnail(client.user.avatarURL({ dynamic: false }));

		const Buttons = new MessageActionRow().addComponents(
			new MessageButton()
				.setURL('https://top.gg/bot/881212769700028497/vote')
				.setLabel('Vote')
				.setStyle('LINK')
		);
		interaction.reply({ embeds: [embed], components: [Buttons] });
	},
};
