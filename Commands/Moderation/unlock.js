const {
	CommandInteraction,
	MessageEmbed,
	Interaction,
	Client,
} = require('discord.js');

module.exports = {
	name: 'unlock',
	description: 'unlock a specific cahnnel',
	permission: 'MANAGE_CHANNELS',
	usage: '/unlock <channel> [reason]',
	options: [
		{
			name: 'channel',
			description: 'channel to unlock',
			type: 'CHANNEL',
			required: true,
			channelTypes: ['GUILD_TEXT', 'GUILD_VOICE'],
		},
		{
			name: 'reason',
			description: 'reason of unlock',
			type: 'STRING',
			required: false,
		},
	],
	/**
	 *
	 * @param {CommandInteraction} interraction
	 * @param {Client} client
	 */
	async execute(interraction, client) {
		const role = interraction.guild.roles.everyone;
		const channel = interraction.options.getChannel('channel');
		const reason =
			interraction.options.getString('reason') || 'No reason Provided!!';

		const unlockEmbed = new MessageEmbed()
			.setAuthor({
				name: client.user.username,
				iconURL: client.user.avatarURL({ format: 'png' }),
			})
			.setDescription(`**Channel unlocked by ${interraction.user}**`)
			.addField('**Reason:**', `${reason}`)
			.addField('**Channel:**', `${channel}`)
			.setColor('#8a2be2')
			.setThumbnail(
				'https://i.pinimg.com/originals/50/05/db/5005dbccb59bc9929274c043b848eb84.gif'
			)
			.setTimestamp();

		if (
			channel.permissionsFor(interraction.guild.id).has('SEND_MESSAGES') ===
				false &&
			channel.type === 'GUILD_TEXT'
		) {
			await channel.permissionOverwrites.edit(role, { SEND_MESSAGES: true });
			interraction.reply({ content: `Unlocked ${channel}`, ephemeral: true });
			channel.send({ embeds: [unlockEmbed] });
		} else if (
			channel.permissionsFor(interraction.guild.id).has('SEND_MESSAGES') ===
				true &&
			channel.type === 'GUILD_TEXT'
		) {
			interraction.reply({
				content: `${channel} is already unlocked`,
				ephemeral: true,
			});
		} else if (
			channel.type === 'GUILD_VOICE' &&
			channel.permissionsFor(interraction.guild.id).has('CONNECT') === false
		) {
			await channel.permissionOverwrites.edit(role, { CONNECT: true });
			interraction.reply({ embeds: [unlockEmbed] });
		} else if (
			channel.type === 'GUILD_VOICE' &&
			channel.permissionsFor(interraction.guild.id).has('CONNECT') === true
		) {
			interraction.reply({
				content: `${channel} already unlocked`,
				ephemeral: true,
			});
		}
	},
};
