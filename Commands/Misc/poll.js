const { CommandInteraction, MessageEmbed, Message } = require('discord.js');

module.exports = {
	name: 'poll',
	description: 'Create a poll',
	usage: '/poll',
	permission: 'MANAGE_MESSAGES',
	options: [
		{
			name: 'question',
			description: 'State the question for the poll',
			type: 'STRING',
			required: true,
		},
		{
			name: 'option-1',
			description: 'State the options for the poll',
			type: 'STRING',
			required: true,
		},
		{
			name: 'option-2',
			description: 'State the options for the poll',
			type: 'STRING',
			required: true,
		},
		{
			name: 'option-3',
			description: 'State the options for the poll',
			type: 'STRING',
		},
		{
			name: 'option-4',
			description: 'State the options for the poll',
			type: 'STRING',
		},
		{
			name: 'option-5',
			description: 'State the options for the poll',
			type: 'STRING',
		},
		{
			name: 'option-6',
			description: 'State the options for the poll',
			type: 'STRING',
		},
		{
			name: 'option-7',
			description: 'State the options for the poll',
			type: 'STRING',
		},
		{
			name: 'option-8',
			description: 'State the options for the poll',
			type: 'STRING',
		},
		{
			name: 'option-9',
			description: 'State the options for the poll',
			type: 'STRING',
		},
		{
			name: 'channel',
			description: 'Select a channel to send the message to.',
			type: 'CHANNEL',
			channelTypes: ['GUILD_TEXT'],
		},
	],
	/**
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction, client) {
		const { options, guild } = interaction;
		const question = options.getString('question');
		const emoji = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
		const gChannel = options.getChannel('channel') || interaction.channel;

		const opt1 = options.getString('option-1');
		const opt2 = options.getString('option-2');
		const opt3 = options.getString('option-3');
		const opt4 = options.getString('option-4');
		const opt5 = options.getString('option-5');
		const opt6 = options.getString('option-6');
		const opt7 = options.getString('option-7');
		const opt8 = options.getString('option-8');
		const opt9 = options.getString('option-9');

		let all = [opt1, opt2, opt3, opt4, opt5, opt6, opt7, opt8, opt9];
		let alloptions = all.join();

		const splitOptions = [];
		let toptions = alloptions.split(',');
		toptions.forEach((e) => {
			if (e.length > 0) {
				splitOptions.push(e.trim());
			}
		});

		let pollOptions = ` `;
		for (let i = 0; i < splitOptions.length; i++) {
			pollOptions = pollOptions + `\n\n ${emoji[i]} ${splitOptions[i]}`;
		}

		const pollEmbed = new MessageEmbed()
			.setColor('#8a2be2')
			.setTitle(` 📊 | **${question}**`)
			.setDescription(pollOptions)
			.setFooter({
				text: `Poll by - ${interaction.user.tag}`,
			})
			.setTimestamp();

		const sendMessage = await client.channels.cache
			.get(gChannel.id)
			.send({ embeds: [pollEmbed] });
		for (let i = 0; i < splitOptions.length; i++) {
			sendMessage.react(`${emoji[i]}`);
		}
		interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor('GREEN')
					.setDescription(
						`<a:tick:936503384771555329> The poll was successfully sent to ${gChannel}.`
					),
			],
			ephemeral: true,
		});
	},
};
