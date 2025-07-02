const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const db = require('../../Structures/Schema/canusegiveawaysc');

module.exports = {
	name: 'gdelete',
	description: 'delete the giveaway',
	usage: '/gdelete <id>',
	options: [
		{
			name: 'id',
			description: 'giveaway id',
			type: 'STRING',
			required: true,
		},
	],
	/**
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction, client) {
		const messageId = interaction.options.getString('id');
		db.findOne({ Guild: interaction.guild.id }, async (err, data) => {
			if (err) throw err;
			if (!data && !interaction.member.permissions.has('ADMINISTRATOR')) {
				return interaction.reply({
					content: `You are not the giveaway manager.`,
					ephemeral: true,
				});
			}
			if (!data && interaction.member.permissions.has('ADMINISTRATOR')) {
				client.giveawaysManager
					.delete(messageId)
					.then(() => {
						interaction.reply({
							content: 'Success! Giveaway deleted!',
							ephemeral: true,
						});
					})
					.catch((err) => {
						interaction.channel.send({
							content: `An error has occurred, please check and try again.\n\`${err}\``,
							ephemeral: true,
						});
					});
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
					client.giveawaysManager
						.delete(messageId)
						.then(() => {
							interaction.reply({
								content: 'Success! Giveaway deleted!',
								ephemeral: true,
							});
						})
						.catch((err) => {
							interaction.channel.send({
								content: `An error has occurred, please check and try again.\n\`${err}\``,
								ephemeral: true,
							});
						});
				}
				var count = 0;
				mainrole.forEach((role) => {
					if (count === 0) {
						const check = interaction.member.roles.cache.get(role);
						if (check) {
							if (role || interaction.member.permissions.has('ADMINISTRATOR')) {
								client.giveawaysManager
									.delete(messageId)
									.then(() => {
										interaction.reply({
											content: 'Success! Giveaway deleted!',
											ephemeral: true,
										});
									})
									.catch((err) => {
										interaction.channel.send({
											content: `An error has occurred, please check and try again.\n\`${err}\``,
											ephemeral: true,
										});
									});
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
