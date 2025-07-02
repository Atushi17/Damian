const { CommandInteraction, Client } = require('discord.js');
const ms = require('ms');
const config = require('../../Structures/config.json');
const db = require('../../Structures/Schema/canusegiveawaysc');

module.exports = {
	name: 'gstart',
	description: 'Start a giveaway',
	usage: '/gstart <duration> <winners> <prize> <channel>',
	options: [
		{
			name: 'duration',
			description:
				'How long the giveaway should last for. Example values: 1m, 1h, 1d',
			type: 'STRING',
			required: true,
		},
		{
			name: 'winners',
			description: 'How many winners the giveaway should have',
			type: 'INTEGER',
			required: true,
		},
		{
			name: 'prize',
			description: 'What the prize of the giveaway should be',
			type: 'STRING',
			required: true,
		},
		{
			name: 'channel',
			description: 'The channel to start the giveaway in',
			type: 'CHANNEL',
			channelTypes: ['GUILD_TEXT'],
			required: true,
		},
	],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */

	async execute(interaction, client) {
		const giveawayChannel = interaction.options.getChannel('channel');
		const giveawayDuration = interaction.options.getString('duration');
		const giveawayWinnerCount = interaction.options.getInteger('winners');
		const giveawayPrize = interaction.options.getString('prize');

		db.findOne({ Guild: interaction.guild.id }, async (err, data) => {
			if (err) throw err;
			if (!data && !interaction.member.permissions.has('ADMINISTRATOR')) {
				return interaction.reply({
					content: `You are not the giveaway manager.`,
					ephemeral: true,
				});
			}
			if (!data && interaction.member.permissions.has('ADMINISTRATOR')) {
				client.giveawaysManager.start(giveawayChannel, {
					duration: ms(giveawayDuration),
					prize: giveawayPrize,
					winnerCount: giveawayWinnerCount,
					hostedBy: interaction.user,
					messages: {
						giveaway:
							(config.everyoneMention ? '@everyone\n\n' : '') +
							'🎉🎉 **GIVEAWAY** 🎉🎉',
						giveawayEnded:
							(config.everyoneMention ? '@everyone\n\n' : '') +
							'🎉🎉 **GIVEAWAY ENDED** 🎉🎉',
						inviteToParticipate: 'React with 🎉 to participate!',
						dropMessage: 'Be the first to react with 🎉 !',
						drawing: 'Drawing in: {timestamp}',
						winMessage: 'Congratulations, {winners}! You won **{this.prize}**!',
						embedFooter: '{this.winnerCount} winner(s)',
						noWinner: 'Giveaway cancelled, no valid participations.',
						hostedBy: 'Hosted by: {this.hostedBy}',
						winners: 'winner(s)',
						endedAt: 'Ended at',
					},
				});

				interaction.reply({
					content: `Giveaway started in ${giveawayChannel}!`,
					ephemeral: true,
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
					client.giveawaysManager.start(giveawayChannel, {
						duration: ms(giveawayDuration),
						prize: giveawayPrize,
						winnerCount: giveawayWinnerCount,
						hostedBy: interaction.user,
						messages: {
							giveaway:
								(config.everyoneMention ? '@everyone\n\n' : '') +
								'🎉🎉 **GIVEAWAY** 🎉🎉',
							giveawayEnded:
								(config.everyoneMention ? '@everyone\n\n' : '') +
								'🎉🎉 **GIVEAWAY ENDED** 🎉🎉',
							inviteToParticipate: 'React with 🎉 to participate!',
							dropMessage: 'Be the first to react with 🎉 !',
							drawing: 'Drawing in: {timestamp}',
							winMessage:
								'Congratulations, {winners}! You won **{this.prize}**!',
							embedFooter: '{this.winnerCount} winner(s)',
							noWinner: 'Giveaway cancelled, no valid participations.',
							hostedBy: 'Hosted by: {this.hostedBy}',
							winners: 'winner(s)',
							endedAt: 'Ended at',
						},
					});

					interaction.reply({
						content: `Giveaway started in ${giveawayChannel}!`,
						ephemeral: true,
					});
				}
				var count = 0;
				mainrole.forEach((role) => {
					if (count === 0) {
						const check = interaction.member.roles.cache.get(role);
						if (check) {
							if (role || interaction.member.permissions.has('ADMINISTRATOR')) {
								client.giveawaysManager.start(giveawayChannel, {
									duration: ms(giveawayDuration),
									prize: giveawayPrize,
									winnerCount: giveawayWinnerCount,
									hostedBy: interaction.user,
									messages: {
										giveaway:
											(config.everyoneMention ? '@everyone\n\n' : '') +
											'🎉🎉 **GIVEAWAY** 🎉🎉',
										giveawayEnded:
											(config.everyoneMention ? '@everyone\n\n' : '') +
											'🎉🎉 **GIVEAWAY ENDED** 🎉🎉',
										inviteToParticipate: 'React with 🎉 to participate!',
										dropMessage: 'Be the first to react with 🎉 !',
										drawing: 'Drawing in: {timestamp}',
										winMessage:
											'Congratulations, {winners}! You won **{this.prize}**!',
										embedFooter: '{this.winnerCount} winner(s)',
										noWinner: 'Giveaway cancelled, no valid participations.',
										hostedBy: 'Hosted by: {this.hostedBy}',
										winners: 'winner(s)',
										endedAt: 'Ended at',
									},
								});

								interaction.reply({
									content: `Giveaway started in ${giveawayChannel}!`,
									ephemeral: true,
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
