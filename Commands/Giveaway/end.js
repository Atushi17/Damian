const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const db = require('../../Structures/Schema/canusegiveawaysc');

module.exports = {
	name: 'gend',
	description: 'end a giveaway',
	usage: '/gend <id>',
	options: [
		{
			name: 'id',
			description: 'id of the giveaway',
			type: 'STRING',
			required: true,
		},
	],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const id = interaction.options.getString('id');
		db.findOne({ Guild: interaction.guild.id }, async (err, data) => {
			if (err) throw err;
			if (!data && !interaction.member.permissions.has('ADMINISTRATOR')) {
				return interaction.reply({
					content: `You are not the giveaway manager.`,
					ephemeral: true,
				});
			}
			if (!data && interaction.member.permissions.has('ADMINISTRATOR')) {
				try {
					client.giveawaysManager.end(id).then(() => {
						interaction.reply({
							content: 'Giveaway Ended !!',
							ephemeral: true,
						});
					});
				} catch {
					interaction.reply({
						content:
							'⛔ | Error\nPlease check if the id is correct!! or The giveaway was already ended.',
						ephemeral: true,
					});
				}
			}
			if (data) {
				const mainrole = data.Roles;
				if (
					mainrole.length === 0 &&
					!interaction.member.permissions.has('ADMINISTRATOR')
				) {
					return interaction.reply({
						content: `You are not the giveaway manager.`,
						ephemeral: true,
					});
				}
				if (
					mainrole.length === 0 &&
					interaction.member.permissions.has('ADMINISTRATOR')
				) {
					try {
						client.giveawaysManager.end(id).then(() => {
							interaction.reply({
								content: 'Giveaway Ended !!',
								ephemeral: true,
							});
						});
					} catch {
						interaction.reply({
							content:
								'⛔ | Error\nPlease check if the id is correct!! or The giveaway was already ended.',
							ephemeral: true,
						});
					}
				}
				var count = 0;
				mainrole.forEach((role) => {
					if (count === 0) {
						const check = interaction.member.roles.cache.get(role);
						if (check) {
							if (role || interaction.member.permissions.has('ADMINISTRATOR')) {
								try {
									client.giveawaysManager.end(id).then(() => {
										interaction.reply({
											content: 'Giveaway Ended !!',
											ephemeral: true,
										});
									});
								} catch {
									interaction.reply({
										content:
											'⛔ | Error\nPlease check if the id is correct!! or The giveaway was already ended.',
										ephemeral: true,
									});
								}
							}
							if (
								!role &&
								!interaction.member.permissions.has('ADMINISTRATOR')
							) {
								return interaction.reply({
									content: `You are not the giveaway manager.`,
									ephemeral: true,
								});
							}
							count = 1;
						}
					}
					if (count === 1) {
						return false;
					}
				});
			}
		});
	},
};
