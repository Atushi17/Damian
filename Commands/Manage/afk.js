const { CommandInteraction, MessageEmbed, Message } = require('discord.js');
const rolesschema = require('../../Structures/Schema/useafksc');
const afkSchema = require('../../Structures/Schema/afksc');

module.exports = {
	name: 'afk',
	description: 'set your self afk',
	options: [
		{
			name: 'reason',
			description: 'reason why you go afk',
			type: 'STRING',
			required: false,
		},
	],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {Message} message
	 */
	async execute(interaction, message) {
		const reason = interaction.options.getString('reason') || 'No reason';

		rolesschema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
			if (err) throw err;
			if (!data && !interaction.member.permissions.has('MANAGE_MESSAGES')) {
				return interaction.reply({
					content: `You can't use this command.`,
					ephemeral: true,
				});
			}
			if (!data && interaction.member.permissions.has('MANAGE_MESSAGES')) {
				afkSchema.findOne(
					{ Guild: interaction.guild.id, User: interaction.user.id },
					async (err, data) => {
						if (err) throw err;
						if (data) {
							interaction.reply({
								content: `${interaction.user} you are no longer afk, you had ${data.pings} mention(s).`,
								ephemeral: true,
							});
							return data.delete();
						} else {
							new afkSchema({
								Guild: interaction.guild.id,
								User: interaction.user.id,
								Reason: reason,
								Date: Date.now(),
								pings: 0,
							}).save();
							return interaction.reply({
								content: `<:sleep:939906700163559444> You are now afk for \`${reason}\``,
							});
						}
					}
				);
			}
			if (data) {
				const mainrole = data.Roles;
				if (
					mainrole.length === 0 &&
					!interaction.member.permissions.has('MANAGE_MESSAGES')
				) {
					return interaction.reply({
						content: `You can't use this command.`,
						ephemeral: true,
					});
				}
				if (
					mainrole.length === 0 &&
					interaction.member.permissions.has('MANAGE_MESSAGES')
				) {
					afkSchema.findOne(
						{ Guild: interaction.guild.id, User: interaction.user.id },
						async (err, data) => {
							if (err) throw err;
							if (data) {
								interaction.reply({
									content: `${interaction.user} you are no longer afk, you had ${data.pings} mention(s).`,
									ephemeral: true,
								});
								return data.delete();
							} else {
								new afkSchema({
									Guild: interaction.guild.id,
									User: interaction.user.id,
									Reason: reason,
									Date: Date.now(),
									pings: 0,
								}).save();
								return interaction.reply({
									content: `<:sleep:939906700163559444> You are now afk for \`${reason}\``,
								});
							}
						}
					);
				}
				var count = 0;
				mainrole.forEach((role) => {
					if (count === 0) {
						const check = interaction.member.roles.cache.get(role);
						if (check) {
							if (
								role ||
								interaction.member.permissions.has('MANAGE_MESSAGES')
							) {
								afkSchema.findOne(
									{ Guild: interaction.guild.id, User: interaction.user.id },
									async (err, data) => {
										if (err) throw err;
										if (data) {
											interaction.reply({
												content: `${interaction.user} you are no longer afk, you had ${data.pings} mention(s).`,
												ephemeral: true,
											});
											return data.delete();
										} else {
											new afkSchema({
												Guild: interaction.guild.id,
												User: interaction.user.id,
												Reason: reason,
												Date: Date.now(),
												pings: 0,
											}).save();
											return interaction.reply({
												content: `<:sleep:939906700163559444> You are now afk for \`${reason}\``,
											});
										}
									}
								);
							}
							if (
								!role &&
								!interaction.member.permissions.has('MANAGE_MESSAGES')
							) {
								return interaction.reply({
									content: `You can't use this command.`,
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
