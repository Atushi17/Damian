const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const db = require('../../Structures/Schema/joinvcsc');

module.exports = {
	name: 'vc-role',
	description: 'Gives a role whenever someone joins a vc',
	permission: 'MANAGE_ROLES',
	usage: '/vc-role <role>',
	options: [
		{
			name: 'role',
			description: 'role to be given.',
			required: true,
			type: 'ROLE',
		},
	],

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */

	async execute(interaction, client) {
		const { guild, options } = interaction;
		const role = options.getRole('role');

		const errembd = new MessageEmbed()
			.setColor('RED')
			.setDescription('⛔ You cannot add roles that are higher than yours.');

		const errbot = new MessageEmbed()
			.setColor('RED')
			.setDescription(
				"⛔ This role is superior than the bot's role, bot's role should be higher than the role that is given."
			);

		const res = new MessageEmbed().setColor('GREEN');

		if (role.position > interaction.member.roles.highest.position) {
			return interaction.reply({ embeds: [errembd], ephemeral: true });
		} else if (role.position > interaction.guild.me.roles.highest.position)
			return interaction.reply({ embeds: [errbot], ephemeral: true });

		db.findOne({ GuildID: guild.id }, async (err, data) => {
			if (err) throw err;
			if (!data) {
				db.create({
					GuildID: guild.id,
					RoleID: role.id,
				});
				return interaction.reply({
					embeds: [res.setDescription(`Join VC role is now set to ${role}.`)],
				});
			}
			if (data) {
				db.updateOne({
					GuildID: guild.id,
					RoleID: role.id,
				});
				return interaction.reply({
					embeds: [
						res.setDescription(`Join VC role is now updated to ${role}.`),
					],
				});
			}
		});
	},
};
