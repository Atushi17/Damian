const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const progress = require('string-progressbar');

module.exports = {
	name: 'poll-show',
	description: 'show the result of poll',
	permission: 'MANAGE_MESSAGES',
	usage: '/poll-show <id>',
	options: [
		{
			name: 'id',
			type: 'STRING',
			description: 'id of the poll',
			required: true,
		},
	],
	/**
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction, client) {
		const { guild, options, member, channel } = interaction;
		const id = options.getString('id');
		try {
			let message = await channel.messages.fetch(id);

			client.count = [];
			message.reactions.cache.forEach((w) => {
				if (w.me === true) {
					client.count.push(w.count - 1);
				}
			});
			let embedmes = message.reactions.message.embeds[0];

			const reply = new MessageEmbed()
				.setColor('#8a2be2')
				.setTitle(embedmes.title)
				.setFooter({ text: `Poll results • Created at` })
				.setTimestamp(embedmes.timestamp);

			let sum = 0;
			for (let i = 0; i < client.count.length; i++) {
				sum += client.count[i];
			}
			let mes = embedmes.description.split('\n\n ');

			if (client.count.length === 2) {
				var total = sum;
				var current_1 = client.count[0];
				var current_2 = client.count[1];

				const pro_1 = progress.filledBar(
					total,
					current_1,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_2 = progress.filledBar(
					total,
					current_2,
					21,
					(line = '░'),
					(slider = '█')
				);
				reply.addFields(
					{
						name: mes[0],
						value: `${pro_1[0]} ${Math.round(
							pro_1[1]
						)}% **(${current_1} votes)**`,
					},
					{
						name: mes[1],
						value: `${pro_2[0]} ${Math.round(
							pro_2[1]
						)}% **(${current_2} votes)**`,
					}
				);
				interaction.reply({ embeds: [reply] });
			}
			if (client.count.length === 3) {
				var total = sum;
				var current_1 = client.count[0];
				var current_2 = client.count[1];
				var current_3 = client.count[2];

				const pro_1 = progress.filledBar(
					total,
					current_1,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_2 = progress.filledBar(
					total,
					current_2,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_3 = progress.filledBar(
					total,
					current_3,
					21,
					(line = '░'),
					(slider = '█')
				);
				reply.addFields(
					{
						name: mes[0],
						value: `${pro_1[0]} ${Math.round(
							pro_1[1]
						)}% **(${current_1} votes)**`,
					},
					{
						name: mes[1],
						value: `${pro_2[0]} ${Math.round(
							pro_2[1]
						)}% **(${current_2} votes)**`,
					},
					{
						name: mes[2],
						value: `${pro_3[0]} ${Math.round(
							pro_3[1]
						)}% **(${current_3} votes)**`,
					}
				);
				interaction.reply({ embeds: [reply] });
			}
			if (client.count.length === 4) {
				var total = sum;
				var current_1 = client.count[0];
				var current_2 = client.count[1];
				var current_3 = client.count[2];
				var current_4 = client.count[3];


				const pro_1 = progress.filledBar(
					total,
					current_1,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_2 = progress.filledBar(
					total,
					current_2,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_3 = progress.filledBar(
					total,
					current_3,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_4 = progress.filledBar(
					total,
					current_4,
					21,
					(line = '░'),
					(slider = '█')
				);
				reply.addFields(
					{
						name: mes[0],
						value: `${pro_1[0]} ${Math.round(
							pro_1[1]
						)}% **(${current_1} votes)**`,
					},
					{
						name: mes[1],
						value: `${pro_2[0]} ${Math.round(
							pro_2[1]
						)}% **(${current_2} votes)**`,
					},
					{
						name: mes[2],
						value: `${pro_3[0]} ${Math.round(
							pro_3[1]
						)}% **(${current_3} votes)**`,
					},
					{
						name: mes[3],
						value: `${pro_4[0]} ${Math.round(
							pro_4[1]
						)}% **(${current_4} votes)**`,
					}
				);
				interaction.reply({ embeds: [reply] });
			}
			if (client.count.length === 5) {
				var total = sum;
				var current_1 = client.count[0];
				var current_2 = client.count[1];
				var current_3 = client.count[2];
				var current_4 = client.count[3];
				var current_5 = client.count[4];

				const pro_1 = progress.filledBar(
					total,
					current_1,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_2 = progress.filledBar(
					total,
					current_2,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_3 = progress.filledBar(
					total,
					current_3,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_4 = progress.filledBar(
					total,
					current_4,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_5 = progress.filledBar(
					total,
					current_5,
					21,
					(line = '░'),
					(slider = '█')
				);
				reply.addFields(
					{
						name: mes[0],
						value: `${pro_1[0]} ${Math.round(
							pro_1[1]
						)}% **(${current_1} votes)**`,
					},
					{
						name: mes[1],
						value: `${pro_2[0]} ${Math.round(
							pro_2[1]
						)}% **(${current_2} votes)**`,
					},
					{
						name: mes[2],
						value: `${pro_3[0]} ${Math.round(
							pro_3[1]
						)}% **(${current_3} votes)**`,
					},
					{
						name: mes[3],
						value: `${pro_4[0]} ${Math.round(
							pro_4[1]
						)}% **(${current_4} votes)**`,
					},
					{
						name: mes[4],
						value: `${pro_5[0]} ${Math.round(
							pro_5[1]
						)}% **(${current_5} votes)**`,
					}
				);
				interaction.reply({ embeds: [reply] });
			}
			if (client.count.length === 6) {
				var total = sum;
				var current_1 = client.count[0];
				var current_2 = client.count[1];
				var current_3 = client.count[2];
				var current_4 = client.count[3];
				var current_5 = client.count[4];
				var current_6 = client.count[5];


				const pro_1 = progress.filledBar(
					total,
					current_1,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_2 = progress.filledBar(
					total,
					current_2,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_3 = progress.filledBar(
					total,
					current_3,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_4 = progress.filledBar(
					total,
					current_4,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_5 = progress.filledBar(
					total,
					current_5,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_6 = progress.filledBar(
					total,
					current_6,
					21,
					(line = '░'),
					(slider = '█')
				);
				reply.addFields(
					{
						name: mes[0],
						value: `${pro_1[0]} ${Math.round(
							pro_1[1]
						)}% **(${current_1} votes)**`,
					},
					{
						name: mes[1],
						value: `${pro_2[0]} ${Math.round(
							pro_2[1]
						)}% **(${current_2} votes)**`,
					},
					{
						name: mes[2],
						value: `${pro_3[0]} ${Math.round(
							pro_3[1]
						)}% **(${current_3} votes)**`,
					},
					{
						name: mes[3],
						value: `${pro_4[0]} ${Math.round(
							pro_4[1]
						)}% **(${current_4} votes)**`,
					},
					{
						name: mes[4],
						value: `${pro_5[0]} ${Math.round(
							pro_5[1]
						)}% **(${current_5} votes)**`,
					},
					{
						name: mes[5],
						value: `${pro_6[0]} ${Math.round(
							pro_6[1]
						)}% **(${current_6} votes)**`,
					}
				);
				interaction.reply({ embeds: [reply] });
			}
			if (client.count.length === 7) {
				var total = sum;
				var current_1 = client.count[0];
				var current_2 = client.count[1];
				var current_3 = client.count[2];
				var current_4 = client.count[3];
				var current_5 = client.count[4];
				var current_6 = client.count[5];
				var current_7 = client.count[6];


				const pro_1 = progress.filledBar(
					total,
					current_1,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_2 = progress.filledBar(
					total,
					current_2,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_3 = progress.filledBar(
					total,
					current_3,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_4 = progress.filledBar(
					total,
					current_4,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_5 = progress.filledBar(
					total,
					current_5,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_6 = progress.filledBar(
					total,
					current_6,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_7 = progress.filledBar(
					total,
					current_7,
					21,
					(line = '░'),
					(slider = '█')
				);
				reply.addFields(
					{
						name: mes[0],
						value: `${pro_1[0]} ${Math.round(
							pro_1[1]
						)}% **(${current_1} votes)**`,
					},
					{
						name: mes[1],
						value: `${pro_2[0]} ${Math.round(
							pro_2[1]
						)}% **(${current_2} votes)**`,
					},
					{
						name: mes[2],
						value: `${pro_3[0]} ${Math.round(
							pro_3[1]
						)}% **(${current_3} votes)**`,
					},
					{
						name: mes[3],
						value: `${pro_4[0]} ${Math.round(
							pro_4[1]
						)}% **(${current_4} votes)**`,
					},
					{
						name: mes[4],
						value: `${pro_5[0]} ${Math.round(
							pro_5[1]
						)}% **(${current_5} votes)**`,
					},
					{
						name: mes[5],
						value: `${pro_6[0]} ${Math.round(
							pro_6[1]
						)}% **(${current_6} votes)**`,
					},
					{
						name: mes[6],
						value: `${pro_7[0]} ${Math.round(
							pro_7[1]
						)}% **(${current_7} votes)**`,
					}
				);
				interaction.reply({ embeds: [reply] });
			}
			if (client.count.length === 8) {
				var total = sum;
				var current_1 = client.count[0];
				var current_2 = client.count[1];
				var current_3 = client.count[2];
				var current_4 = client.count[3];
				var current_5 = client.count[4];
				var current_6 = client.count[5];
				var current_7 = client.count[6];
				var current_8 = client.count[7];

				const pro_1 = progress.filledBar(
					total,
					current_1,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_2 = progress.filledBar(
					total,
					current_2,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_3 = progress.filledBar(
					total,
					current_3,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_4 = progress.filledBar(
					total,
					current_4,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_5 = progress.filledBar(
					total,
					current_5,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_6 = progress.filledBar(
					total,
					current_6,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_7 = progress.filledBar(
					total,
					current_7,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_8 = progress.filledBar(
					total,
					current_8,
					21,
					(line = '░'),
					(slider = '█')
				);
				reply.addFields(
					{
						name: mes[0],
						value: `${pro_1[0]} ${Math.round(
							pro_1[1]
						)}% **(${current_1} votes)**`,
					},
					{
						name: mes[1],
						value: `${pro_2[0]} ${Math.round(
							pro_2[1]
						)}% **(${current_2} votes)**`,
					},
					{
						name: mes[2],
						value: `${pro_3[0]} ${Math.round(
							pro_3[1]
						)}% **(${current_3} votes)**`,
					},
					{
						name: mes[3],
						value: `${pro_4[0]} ${Math.round(
							pro_4[1]
						)}% **(${current_4} votes)**`,
					},
					{
						name: mes[4],
						value: `${pro_5[0]} ${Math.round(
							pro_5[1]
						)}% **(${current_5} votes)**`,
					},
					{
						name: mes[5],
						value: `${pro_6[0]} ${Math.round(
							pro_6[1]
						)}% **(${current_6} votes)**`,
					},
					{
						name: mes[6],
						value: `${pro_7[0]} ${Math.round(
							pro_7[1]
						)}% **(${current_7} votes)**`,
					},
					{
						name: mes[7],
						value: `${pro_8[0]} ${Math.round(
							pro_8[1]
						)}% **(${current_8} votes)**`,
					}
				);
				interaction.reply({ embeds: [reply] });
			}
			if (client.count.length === 9) {
				var total = sum;
				var current_1 = client.count[0];
				var current_2 = client.count[1];
				var current_3 = client.count[2];
				var current_4 = client.count[3];
				var current_5 = client.count[4];
				var current_6 = client.count[5];
				var current_7 = client.count[6];
				var current_8 = client.count[7];
				var current_9 = client.count[8];

				const pro_1 = progress.filledBar(
					total,
					current_1,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_2 = progress.filledBar(
					total,
					current_2,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_3 = progress.filledBar(
					total,
					current_3,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_4 = progress.filledBar(
					total,
					current_4,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_5 = progress.filledBar(
					total,
					current_5,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_6 = progress.filledBar(
					total,
					current_6,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_7 = progress.filledBar(
					total,
					current_7,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_8 = progress.filledBar(
					total,
					current_8,
					21,
					(line = '░'),
					(slider = '█')
				);
				const pro_9 = progress.filledBar(
					total,
					current_9,
					21,
					(line = '░'),
					(slider = '█')
				);
				reply.addFields(
					{
						name: mes[0],
						value: `${pro_1[0]} ${Math.round(
							pro_1[1]
						)}% **(${current_1} votes)**`,
					},
					{
						name: mes[1],
						value: `${pro_2[0]} ${Math.round(
							pro_2[1]
						)}% **(${current_2} votes)**`,
					},
					{
						name: mes[2],
						value: `${pro_3[0]} ${Math.round(
							pro_3[1]
						)}% **(${current_3} votes)**`,
					},
					{
						name: mes[3],
						value: `${pro_4[0]} ${Math.round(
							pro_4[1]
						)}% **(${current_4} votes)**`,
					},
					{
						name: mes[4],
						value: `${pro_5[0]} ${Math.round(
							pro_5[1]
						)}% **(${current_5} votes)**`,
					},
					{
						name: mes[5],
						value: `${pro_6[0]} ${Math.round(
							pro_6[1]
						)}% **(${current_6} votes)**`,
					},
					{
						name: mes[6],
						value: `${pro_7[0]} ${Math.round(
							pro_7[1]
						)}% **(${current_7} votes)**`,
					},
					{
						name: mes[7],
						value: `${pro_8[0]} ${Math.round(
							pro_8[1]
						)}% **(${current_8} votes)**`,
					},
					{
						name: mes[8],
						value: `${pro_9[0]} ${Math.round(
							pro_9[1]
						)}% **(${current_9} votes)**`,
					}
				);
				interaction.reply({ embeds: [reply] });
			}
		} catch (err) {
			return interaction.reply({
				content: `ID is wrong or try it in the channel where the poll is!`,
				ephemeral: true,
			});
		}
	},
};
