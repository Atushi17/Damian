const { client, CommandInteraction, MessageEmbed } = require('discord.js');
const DB = require('../../Structures/Schema/suggestsc');

module.exports = {
	name: 'interactionCreate',
	/**
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction, client) {
		if (!interaction.isButton()) return;
		const ButtonInteraction = interaction;
		const chck = ButtonInteraction.member.roles.cache.get(
			`${ButtonInteraction.customId}`
		);
		const rle = ButtonInteraction.customId;
		const rolecheck = interaction.guild.roles.cache.get(`${rle}`);

		if (rolecheck) {
			const errbot = new MessageEmbed()
				.setColor('RED')
				.setDescription(
					"⛔ This role is superior than the bot's role, bot's role should be higher than the role that is given."
				);

			if (
				!ButtonInteraction.member.guild.roles.cache.get(
					`${ButtonInteraction.customId}`
				)
			)
				return ButtonInteraction.reply({
					content: `The role is invalid`,
					ephemeral: true,
				}); // If role is deleted

			if (
				rolecheck.position > ButtonInteraction.guild.me.roles.highest.position
			)
				return ButtonInteraction.reply({ embeds: [errbot], ephemeral: true });

			if (!chck) {
				ButtonInteraction.member.roles.add(`${rle}`);
				ButtonInteraction.reply({
					content: `The role was successfully given to you!`,
					ephemeral: true,
				});
			} else if (chck) {
				ButtonInteraction.member.roles.remove(`${rle}`);
				ButtonInteraction.reply({
					content: `I successfully took your role!`,
					ephemeral: true,
				});
			}
		} else if (
			!rolecheck &&
			['suggest-accept', 'suggest-decline'].includes(ButtonInteraction.customId)
		) {
			if (!interaction.member.permissions.has('ADMINISTRATOR'))
				return interaction.reply({
					content: 'You cannot use this button',
					ephemeral: true,
				});

			const { guildId, customId, message } = interaction;

			DB.findOne(
				{ guildId: guildId, MessageID: message.id },
				async (err, data) => {
					if (err) throw err;
					if (!data)
						return interaction.reply({
							content: 'No data was found in the database',
							ephemeral: true,
						});

					const Embed = message.embeds[0];
					if (!Embed) return;

					switch (customId) {
						case 'suggest-accept':
							{
								Embed.fields[2] = {
									name: 'Status',
									value: '✅ Accepted',
									inline: true,
								};
								message.edit({
									embeds: [Embed.setColor('GREEN')],
									components: [],
								});
								return interaction.reply({
									content: 'Suggestion Accepted',
									ephemeral: true,
								});
							}
							break;
						case 'suggest-decline':
							{
								Embed.fields[2] = {
									name: 'Status',
									value: '⛔ Declined',
									inline: true,
								};
								message.edit({
									embeds: [Embed.setColor('RED')],
									components: [],
								});
								return interaction.reply({
									content: 'Suggestion Declined',
									ephemeral: true,
								});
							}
							break;
					}
				}
			);
		}
	},
};
