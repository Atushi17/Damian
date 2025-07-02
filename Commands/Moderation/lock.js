const {
	CommandInteraction,
	MessageEmbed,
	Interaction,
	Client,
} = require('discord.js');
const { format } = require('path/posix');

module.exports = {
	name: 'lock',
	description: 'lock a specific cahnnel',
	permission: 'MANAGE_CHANNELS',
	usage: '/lock <channel> <reason>',
	options: [
		{
			name: 'channel',
			description: 'channel to lock',
			type: 'CHANNEL',
			required: true,
			channelTypes: ['GUILD_TEXT', 'GUILD_VOICE'],
		},
		{
			name: 'reason',
			description: 'reason of lock',
			type: 'STRING',
			required: true,
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
		const reason = interraction.options.getString('reason');

		const lockEmbed = new MessageEmbed()
			.setAuthor({
				name: client.user.username,
				iconURL: client.user.avatarURL({ format: 'png' }),
			})
			.setDescription(`**Channel locked by ${interraction.user}**`)
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
			return interraction.reply({
				content: `${channel} is already locked!`,
				ephemeral: true,
			});
		} else if (
			channel.permissionsFor(interraction.guild.id).has('SEND_MESSAGES') ===
				true &&
			channel.type === 'GUILD_TEXT'
		) {
			await channel.permissionOverwrites.edit(role, { SEND_MESSAGES: false });
			interraction.reply({
				content: `${channel} has been locked!!`,
				ephemeral: true,
			});
			channel.send({ embeds: [lockEmbed] });
		} else if (
			channel.type === 'GUILD_VOICE' &&
			channel.permissionsFor(interraction.guild.id).has('CONNECT') === false
		) {
			return interraction.reply({
				content: `${channel} is already locked!`,
				ephemeral: true,
			});
		} else if (
			channel.type === 'GUILD_VOICE' &&
			channel.permissionsFor(interraction.guild.id).has('CONNECT') === true
		) {
			await channel.permissionOverwrites.edit(role, { CONNECT: false });
			interraction.reply({ embeds: [lockEmbed] });
		}
	},
};
