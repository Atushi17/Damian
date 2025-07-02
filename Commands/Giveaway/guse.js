const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const db = require('../../Structures/Schema/canusegiveawaysc');

module.exports = {
	name: 'guse',
	description: 'who can use giveaway command!',
	permission: 'ADMINISTRATOR',
	usage: '/guse <choice> <role>',
	options: [
		{
			name: 'choice',
			description: 'add or remove a role',
			type: 'STRING',
			required: true,
			choices: [
				{ name: 'Add', value: 'add' },
				{ name: 'Remove', value: 'remove' },
			],
		},
		{
			name: 'role',
			description: 'the role which need to be added or removed',
			type: 'ROLE',
			required: true,
		},
	],
	/**
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction, client) {
		const { options, guild } = interaction;

		const role = options.getRole('role');
		const choice = options.getString('choice');

		const res = new MessageEmbed()
			.setDescription(`${role} is set as giveaway manager.`)
			.setColor('GREEN');

		const removeres = new MessageEmbed()
			.setDescription(`${role} removed from giveaway manager.`)
			.setColor('GREEN');

		switch (choice) {
			case 'add':
				db.findOne({ Guild: guild.id }, async (err, data) => {
					if (err) throw err;
					if (!data) {
						await db.create({
							Guild: guild.id,
							Roles: role.id,
						});

						return interaction.reply({
							embeds: [res],
						});
					}
					if (data) {
						data.Roles.push(role.id);
						interaction.reply({ embeds: [res] });
					}

					data.save();
				});
				break;

			case 'remove':
				db.findOne({ Guild: guild.id }, async (err, data) => {
					if (err) throw err;
					if (!data)
						return interaction.reply({
							content: `There is no data to remove!`,
							ephemeral: true,
						});
					if (data) {
						data.Roles.remove(role.id);
						interaction.reply({ embeds: [removeres] });
					}

					data.save();
				});
				break;
		}
	},
};
